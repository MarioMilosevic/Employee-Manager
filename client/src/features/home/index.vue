<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <TitleName align="center">Employee Manager</TitleName>
    <h2>Employee List</h2>
    <ActionButton
      color="white"
      size="big"
      :style="{ alignSelf: 'flex-start' }"
      @click="setModal(true)"
    >
      Add New Employee
    </ActionButton>
    <EmployeeList>
      <template #employees>
        <Employee
          v-for="employee in employees"
          :key="employee.id"
          :employee="employee"
          :inputs="homeInputs"
          @delete-event="deleteEmployee"
          @edit-event="editEmployee"
        />
      </template>
    </EmployeeList>

    <FormModal
      v-if="isModalOpen"
      :singleEmployee="singleEmployee"
      :inputs="homeInputs"
      @close-modal="setModal(false)"
      @submit-event="submitForm"
    />
  </template>
</template>

<script setup lang="ts">
import FormModal from 'src/components/form/FormModal.vue'
import TitleName from 'src/components/layout/TitleName.vue'
import EmployeeList from './EmployeeList.vue'
import Employee from 'src/features/home/Employee.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import { emptyEmployeeErrors, emptySingleEmployee } from 'src/utils/constants'
import { EmployeeType } from 'src/utils/types'
import { ref, onBeforeMount } from 'vue'
import { getData, deleteData, postData, editData } from 'src/api/api'
import { showToast } from 'src/utils/toast'

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

const addEmployee = (employee: EmployeeType) => employees.value.push(employee)

const removeEmployee = (id: number) => {
  employees.value = employees.value.filter((emp) => emp.id !== id)
}

const resetForm = () => {
  formErrors.value = emptyEmployeeErrors
}

const submitForm = async (employee: EmployeeType) => {
  console.log(employee)
  try {
    const response = await postData(employee, 'employee')
    addEmployee(response.data)
    resetForm()
    setModal(false)
  } catch (error) {
    console.error(error)
  }
}

const editEmployee = async (employee: EmployeeType) => {
  try {
    const response = await editData(employee, `employee/${employee.id}`)
    if (response.data) {
      employees.value = employees.value.map((emp) => (emp.id === employee.id ? employee : emp))
    } else {
      showToast(response.message, 'error')
    }
  } catch (error) {
    console.error(error)
  }
}

const deleteEmployee = async (id: number) => {
  try {
    const response = await deleteData('employee', id)
    if (response && response.ok) {
      removeEmployee(id)
    } else {
      const responseData = await response?.json()
      console.log(responseData)
      showToast(responseData.message, 'error')
    }
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
