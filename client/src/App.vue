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
          <FormError>{{ firstNameErr }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #lastName>
      <FormInput
        dataName="lastName"
        type="text"
        placeholder="Last Name"
        :value="lastName"
        @update-value="updateFormState"
      />
    </template>
    <template #address>
      <FormInput
        dataName="address"
        type="text"
        placeholder="Address"
        :value="address"
        @update-value="updateFormState"
      />
    </template>
    <template #startYear>
      <FormInput
        dataName="startYear"
        type="date"
        placeholder="Start Year"
        :value="startYear"
        @update-value="updateFormState"
      />
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

  <EmployeeInfo v-for="employee in employees" :key="employee.id" :employee="employee" />
</template>

<script lang="ts">
import TitleName from 'src/components/layout/TitleName.vue'
import FormInput from 'src/components/form/FormInput.vue'
import EmployeeForm from 'src/components/form/EmployeeForm.vue'
import EmployeeInfo from 'src/components/layout/EmployeeInfo.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import FormBlock from 'src/components/form/FormBlock.vue'
import FormError from "src/components/form/FormError.vue"
import { EmployeeType } from './utils/types'
import { employeeFormSchema } from './validation/employeeFormSchema'
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const employees = reactive([] as EmployeeType[])

    const formState = reactive({
      firstName: '',
      lastName: '',
      address: '',
      startYear: '',
      trainingCompleted: false,
    })

     const formErrors = reactive({
      firstNameErr: 'First name is required',
      lastNameErr: 'First name is required',
      addressErr: 'First name is required',
      startYearErr: 'First name is required',
    })

    const updateFormState = (key: keyof typeof formState, value: string) => {
      formState[key] = value as never
    }

     const submitForm = () => {
      const validation = employeeFormSchema.safeParse(formState)

      if (validation.success) {
        // Reset errors if validation is successful
        // for (const key in formErrors ) {
        //   formErrors[key]  = ''
        // }
        console.log('Form submitted successfully!')
        console.log(formState)
      } else {
        // Handle validation errors
        validation.error.errors.forEach((err) => {
          const field = err.path[0] as keyof typeof formErrors
          formErrors[field] = err.message
        })
        console.log('Form submission failed with errors.')
        console.log(formErrors)
      }
    }

    return {
      employees,
      submitForm,
      // updateFormFirstName,
      updateFormState,
      ...toRefs(formState),
      ...toRefs(formErrors)
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
