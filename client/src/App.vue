<template>
  <TitleName>Employee Manager</TitleName>
  <EmployeeForm @submit.prevent="submitForm">
    <template #firstName>
      <FormInput
        dataName="firstName"
        type="text"
        placeholder="First Name"
        :value="firstName"
        @update-value="updateFormState"
      />
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
import { EmployeeType } from './utils/types'
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

    const updateFormState = (key: keyof typeof formState, value: string) => {
      formState[key] = value as never
    }

    const submitForm = () => {
      console.log('submit')
      console.log(formState)
    }

    return {
      employees,
      submitForm,
      // updateFormFirstName,
      updateFormState,
      ...toRefs(formState),
    }
  },
  components: {
    TitleName,
    FormInput,
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
