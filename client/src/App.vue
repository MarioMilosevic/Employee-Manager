<template>
  <TitleName>Employee Manager</TitleName>
  <EmployeeForm @submit.prevent="submitForm">
    <template #firstName>
      <FormInput type="text" placeholder="First Name" />
    </template>
    <template #lastName>
      <FormInput type="text" placeholder="Last Name" />
    </template>
    <template #address>
      <FormInput type="text" placeholder="Address" />
    </template>
    <template #startYear>
      <FormInput type="number" placeholder="Start Year" />
    </template>
    <template #trainingCompleted>
      <div class="checkbox">
        <label for="training">Training Completed ?</label>
        <input id="training" type="checkbox" />
      </div>
    </template>
    <template #submit>
      <ActionButton color="white" type="submit" :style="{justifySelf:'start'}">
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
import { reactive } from 'vue'
import { EmployeeType } from './utils/types'
export default {
  setup() {
    const arr = [
      {
        id: '1',
        firstName: 'Mario',
        lastName: 'Milosevic',
        startYear: 2025,
        address: 'Kotor Crna Gora 24',
        trainingCompleted: false,
      },
      {
      id:'2',
        firstName: 'Toni',
        lastName: 'Milosevic',
        startYear: 2025,
        address: 'Kotor Crna Gora 24',
        trainingCompleted: false,
      },
      {
      id:'3',
        firstName: 'Milica',
        lastName: 'Bugarski',
        startYear: 2025,
        address: 'Kotor Crna Gora 24',
        trainingCompleted: false,
      },
    ]
    const employees = reactive(arr)
    const submitForm = () => {
        console.log('submit')
      }


    // const employees = reactive([] as EmployeeType[])

    return {
      employees,
      submitForm
    }
  },
  components: {
    TitleName,
    FormInput,
    EmployeeForm,
    EmployeeInfo,
    ActionButton
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
