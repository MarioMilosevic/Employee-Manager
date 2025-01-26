<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <TitleName>Employee Manager</TitleName>
    <!-- <AuthForm @submit.prevent="submitForm" class="form" :inputs="homeInputs">
      <template v-for="input in homeInputs" :key="input.id" #[input.name]>
        <FormBlock>
          <template #input>
            <FormInput
            v-bind="input"
            v-model="singleEmployee[input.name as keyof typeof singleEmployee]"
            />
          </template>
          <template #error>
            <FormError>{{ formErrors[input.name as keyof typeof formErrors] }}</FormError>
          </template>
        </FormBlock>
      </template>
      <template #default>
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
    </AuthForm> -->
    <h2>Employee List</h2>
    <ActionButton color="white" size="big" :style="{ alignSelf: 'flex-start' }" @click="setModal(true)">
      Add New Employee
  </ActionButton>
    <EmployeeList>
      <template #employees>
        <EmployeeInfo
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
        @edit-event="editEmployee"
        @delete-event="deleteEmployee"
        />
      </template>
    </EmployeeList>

    <FormModal
      v-if="isModalOpen"
      :singleEmployee="singleEmployee"
      :inputs="homeInputs"
      @close-modal="setModal(false)"
      @update-event="updateEmployees"
    />
  </template>
</template>

<script setup lang="ts">
import FormModal from 'src/components/form/FormModal.vue'
import TitleName from 'src/components/layout/TitleName.vue'
import FormInput from 'src/components/form/FormInput.vue'
import EmployeeList from './EmployeeList.vue'
import EmployeeInfo from 'src/features/home/EmployeeInfo.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import FormBlock from 'src/components/form/FormBlock.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import FormError from 'src/components/form/FormError.vue'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import AuthForm from 'src/components/form/AuthForm.vue'
import { renderValidationErrors } from 'src/utils/helpers'
import { emptyEmployeeErrors, emptySingleEmployee } from 'src/utils/constants'
import { EmployeeType } from 'src/utils/types'
import { employeeFormSchema } from 'src/validation/employeeFormSchema'
import { ref, nextTick, onBeforeMount } from 'vue'
import { getData, deleteData, postData } from 'src/api/api'

onBeforeMount(async () => {
  try {
    const [employeeResponse, homeResponse] = await Promise.all([
      getData('employee'),
      getData('inputs/home'),
    ])

    employees.value = employeeResponse.data
    homeInputs.value = homeResponse.data
    loading.value = false
  } catch (error) {
    console.log(error)
  }
})

const employees = ref([] as EmployeeType[])
const isModalOpen = ref<boolean>(false)
const homeInputs = ref()
const singleEmployee = ref<EmployeeType>(emptySingleEmployee)
const formErrors = ref(emptyEmployeeErrors)
const loading = ref<boolean>(true)

const updateEmployees = async (updatedEmployee: EmployeeType) => {
  employees.value = employees.value.map((emp) =>
    emp.id === updatedEmployee.id ? updatedEmployee : emp,
  )
  setModal(false)
}

const setTrainingCompleted = (value: boolean) => {
  singleEmployee.value.trainingCompleted = value
}

const addEmployee = (employee: EmployeeType) => employees.value.push(employee)

const removeEmployee = (id: number) => {
  employees.value = employees.value.filter((emp) => emp.id !== id)
}

const resetForm = () => {
  formErrors.value = emptyEmployeeErrors
}

const submitForm = async () => {
  const validation = employeeFormSchema.safeParse(singleEmployee.value)
  if (validation.success) {
    const response = await postData(validation.data, 'employee')
    addEmployee(response.data)
    resetForm()
  } else {
    const updatedErorrs = renderValidationErrors(formErrors, validation.error.errors)
    formErrors.value = updatedErorrs
  }
}

const editEmployee = async (id: string) => {
  console.log(id)
  const response = await getData(`employee/${id}`)
  singleEmployee.value = response.data
  setModal(true)
  await nextTick()
  singleEmployee.value = emptySingleEmployee
}

const deleteEmployee = async (id: number) => {
  try {
    const response = await deleteData('employee', id)
    console.log('ovo dobijem odje', response)
    // if (response.ok) {
    //   removeEmployee(id)
    // } else {
    //   throw ''
    // }
    // const isStatusOk = await deleteData(`employee`, id)
    // if (isStatusOk) {
    //   removeEmployee(id)
    // }
  } catch (error) {
    console.log(error)
  }
}

const setModal = (value: boolean) => {
  isModalOpen.value = value
}
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $primary-shade-color;
  padding: $big;
  border-radius: $small-radius;
}
</style>
