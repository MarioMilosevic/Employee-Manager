<template>
  <TitleName>Employee Manager</TitleName>
  <EmployeeForm @submit.prevent="submitForm">
    <template #firstName>
      <FormInput type="text" placeholder="First Name" :value="firstName" />
    </template>
    <template #lastName>
      <FormInput type="text" placeholder="Last Name" :value="lastName" />
    </template>
    <template #address>
      <FormInput type="text" placeholder="Address" :value="address" />
    </template>
    <template #startYear>
      <FormInput type="date" placeholder="Start Year" :value="startYear" />
    </template>
    <template #trainingCompleted>
      <div class="checkbox">
        <label for="training">Training Completed ?</label>
        <input id="training" type="checkbox" :checked="trainingCompleted" />
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

    const updateFormState = (key: keyof typeof formState, value: string | boolean) => {
      formState[key] = value as never
    }

    const submitForm = () => {
      console.log('submit')
    }

    return {
      employees,
      submitForm,
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
