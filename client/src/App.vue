<template>
  <TitleName>Employee Manager</TitleName>
  <EmployeeForm @submit.prevent="submitForm">
    <template #firstName>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="firstName"
            type="text"
            placeholder="First Name"
            :value="firstName"
            @update-value="updateFormState"
          />
        </template>
        <template #error>
          <FormError>{{ firstName }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #lastName>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="lastName"
            type="text"
            placeholder="Last Name"
            :value="lastName"
            @update-value="updateFormState"
          />
        </template>
        <template #error>
          <FormError>{{ lastName }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #address>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="address"
            type="text"
            placeholder="Address"
            :value="address"
            @update-value="updateFormState"
          />
        </template>
        <template #error>
          <FormError>{{ address }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #startYear>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="startYear"
            type="date"
            placeholder="Start Year"
            :value="startYear"
            @update-value="updateFormState"
          />
        </template>
        <template #error>
          <FormError>{{ startYear }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #trainingCompleted>
      <div class="checkbox">
        <label for="training">Training Completed ?</label>
        <input
          dataName="trainingCompleted"
          id="training"
          type="checkbox"
          :checked="trainingCompleted"
          v-model="trainingCompleted"
          @input="!trainingCompleted"
        />
      </div>
    </template>
    <template #submit>
      <ActionButton color="white" type="submit" :style="{ justifySelf: 'start' }">
        Submit
      </ActionButton>
    </template>
  </EmployeeForm>

  <EmployeeInfo
    v-for="employee in employees"
    :key="employee.id"
    :employee="employee"
    @edit-event="editEmployee"
    @delete-event="deleteEmployee"
  />
</template>

<script lang="ts">
import TitleName from 'src/components/layout/TitleName.vue'
import FormInput from 'src/components/form/FormInput.vue'
import EmployeeForm from 'src/components/form/EmployeeForm.vue'
import EmployeeInfo from 'src/components/layout/EmployeeInfo.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import FormBlock from 'src/components/form/FormBlock.vue'
import FormError from 'src/components/form/FormError.vue'
import { baseUrl } from 'src/utils/constants'
import { postData, getEmployees } from 'src/api'
import { EmployeeType } from 'src/utils/types'
import { employeeFormSchema } from 'src/validation/employeeFormSchema'
import { reactive, toRefs, ref, onMounted } from 'vue'

export default {
setup() {
    const employees = ref([] as EmployeeType[])

    const formState = reactive({
      firstName: 'Mario',
      lastName: 'Milosevic',
      address: 'Novo Naselje',
      startYear: '2024-12-28',
      trainingCompleted: false,
    })

    const formErrors = reactive({
      firstName: '',
      lastName: '',
      address: '',
      startYear: '',
    })

    const fetchEmployees = async () => {
      try {
        const data = await getEmployees()
        employees.value = data
      } catch (error) {
        console.error('Failed to fetch employees', error)
      }
    }

    onMounted(fetchEmployees)

    const updateFormState = (key: keyof typeof formState, value: string) => {
      formState[key] = value as never
    }

    const addEmployee = (employee:EmployeeType) => {
      employees.value = [...employees.value, employee]
    }

    // const resetForm = () => {
    //   formErrors.firstName = ''
    //   formErrors.lastName = ''
    //   formErrors.address = ''
    //   formErrors.startYear = ''
    // }

    const submitForm = async () => {
      const validation = employeeFormSchema.safeParse(formState)
      if (validation.success) {
        const validationData = {
          id: crypto.randomUUID(),
          ...validation.data,
        }
        console.log(validationData)
        const response = await postData(validationData)
        console.log('client response ', response)
        addEmployee(response)
        // resetForm()
      } else {
        const errors = validation.error.errors
        errors.forEach((error) => {
          console.log(error)
          const field = error.path[0] as keyof typeof formErrors
          formErrors[field] = error.message
        })
      }
    }

    const editEmployee = (id: string) => {
      console.log(id)
      console.log('edit u appu')
    }

    const deleteEmployee = async (id: string) => {
      console.log(id)
      console.log('delete u appu')
      const response = await fetch(`${baseUrl}/employee/${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()
      console.log(result)
      // const result = await response.json()
      // employees.value = result.data
    }

    return {
      employees,
      submitForm,
      updateFormState,
      deleteEmployee,
      editEmployee,
      ...toRefs(formState),
      ...toRefs(formErrors),
    }
  },
  components: {
    TitleName,
    FormInput,
    FormBlock,
    FormError,
    EmployeeForm,
    EmployeeInfo,
    ActionButton,
  },
}
</script>

<style scoped lang="scss">
@use 'src/scss/_variables' as *;

.checkbox {
  border: 1px solid white;
  display: flex;
  align-items: center;
  gap: $medium;
  padding: $small;
  border-radius: $small-radius;
}
</style>
