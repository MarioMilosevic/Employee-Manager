<template>
  <TitleName>Employee Manager</TitleName>
  <EmployeeForm @submit.prevent="submitForm" class="form">
    <template #firstName>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="firstName"
            type="text"
            placeholder="First Name"
            :value="singleEmployee.firstName"
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
            :value="singleEmployee.lastName"
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
            :value="singleEmployee.address"
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
            :value="singleEmployee.startYear"
            @update-value="updateFormState"
          />
        </template>
        <template #error>
          <FormError>{{ startYear }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #trainingCompleted>
      <FormCheckbox
        :trainingCompleted="singleEmployee.trainingCompleted"
        @checkbox-event="setTrainingCompleted"
      />
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
  <FormModal
    :isModalOpen="isModalOpen"
    @close-modal="setModal(false)"
    @update-event="updateEmployees"
    :singleEmployee="singleEmployee"
  />
</template>

<script lang="ts">
import FormModal from 'src/components/form/FormModal.vue'
import TitleName from 'src/components/layout/TitleName.vue'
import FormInput from 'src/components/form/FormInput.vue'
import EmployeeForm from 'src/components/form/EmployeeForm.vue'
import EmployeeInfo from 'src/components/layout/EmployeeInfo.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import FormBlock from 'src/components/form/FormBlock.vue'
import FormError from 'src/components/form/FormError.vue'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import { baseUrl } from 'src/utils/constants'
import { postData, getEmployees, deleteData } from 'src/api'
import { EmployeeType } from 'src/utils/types'
import { employeeFormSchema } from 'src/validation/employeeFormSchema'
import { reactive, toRefs, ref, onMounted } from 'vue'

export default {
  setup() {
    const employees = ref([] as EmployeeType[])
    const isModalOpen = ref(false)

    const singleEmployee = ref({
      id: '',
      firstName: '',
      lastName: '',
      address: '',
      startYear: '',
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

    const updateFormState = <K extends keyof typeof singleEmployee.value>(
      key: K,
      value: (typeof singleEmployee.value)[K],
    ) => {
      singleEmployee.value[key] = value
    }

    const updateEmployees = async (updatedEmployee: EmployeeType) => {
      employees.value = employees.value.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp,
      )
      setModal(false)
    }

    const setTrainingCompleted = (value: boolean) => {
      singleEmployee.value.trainingCompleted = value
    }

    const addEmployee = (employee: EmployeeType) => {
      employees.value = [...employees.value, employee]
    }

    const removeEmployee = (employee: EmployeeType) => {
      employees.value = employees.value.filter((emp) => emp.id !== employee.id)
    }

    const resetForm = () => {
      formErrors.firstName = ''
      formErrors.lastName = ''
      formErrors.address = ''
      formErrors.startYear = ''
    }

    const submitForm = async () => {
      const validation = employeeFormSchema.safeParse(singleEmployee.value)
      if (validation.success) {
        const validationData = {
          id: crypto.randomUUID(),
          ...validation.data,
        }
        const response = await postData(validationData)
        addEmployee(response)
        resetForm()
      } else {
        const errors = validation.error.errors
        errors.forEach((error) => {
          console.log(error)
          const field = error.path[0] as keyof typeof formErrors
          formErrors[field] = error.message
        })
      }
    }

    const editEmployee = async (id: string) => {
      const response = await fetch(`${baseUrl}/employee/${id}`)
      const { data } = await response.json()
      singleEmployee.value = data
      setModal(true)
    }

    const deleteEmployee = async (id: string) => {
      const data = await deleteData(id)
      removeEmployee(data)
    }

    const setModal = (value: boolean) => {
      isModalOpen.value = value
    }

    return {
      employees,
      submitForm,
      updateFormState,
      deleteEmployee,
      editEmployee,
      updateEmployees,
      isModalOpen,
      setModal,
      singleEmployee,
      setTrainingCompleted,
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
    FormModal,
    FormCheckbox,
  },
}
</script>

<style scoped lang="scss">
@use 'src/scss/_variables' as *;

.form {
  display: flex;
justify-content: space-between;
    align-items: center;
  background-color: $primary-shade-color;
  padding: $big;
  border-radius: $small-radius;
}
</style>
