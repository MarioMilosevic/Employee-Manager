<template>
  <LoadingSpinner v-if="loading" />
  <MainComponent
    v-else
    :elements="employees"
    :inputs="homeInputs"
    :table-headings="homeHeadings"
    page="home"
    :user="user"
    @delete-event="deleteEmployee"
    @edit-event="editEmployee"
    @submit-event="submitForm"
  >
    <template #button>
      <ActionButton
        @click="goToDashboard"
        :style="{ position: 'absolute', top: '50%', right: '0%', transform: 'translateY(-50%)' }"
        >Dashboard</ActionButton
      >
    </template>
    <template #subtitle>
      <h2>Employee List</h2>
    </template>
    <template #leftButton> Add New Employee </template>

    <template #rightButton>
      <ActionButton color="white" size="big" @click="signOut">Sign Out</ActionButton>
    </template>
  </MainComponent>
</template>

<script setup lang="ts">
import MainComponent from 'src/components/layout/MainComponent.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import { emptyEmployeeErrors } from 'src/utils/constants'
import { EmployeeType, InputType, TableHeadingType, UserType } from 'src/utils/types'
import { onBeforeMount, ref } from 'vue'
import { deleteData, postData, editData, getData, getUserData } from 'src/api/api'
import { showToast } from 'src/utils/toast'
import { useRouter } from 'vue-router'

onBeforeMount(async () => {
  const token = localStorage.getItem('login-token')
  const [employeeResponse, tableResponse, inputsResponse, userResponse] = await Promise.all([
    getData('employee'),
    getData('table/main'),
    getData('inputs/home'),
    getUserData(token as string),
  ])
  employees.value = employeeResponse.data
  homeHeadings.value = tableResponse.data
  homeInputs.value = inputsResponse.data
  user.value = userResponse.data
  loading.value = false
})

const employees = ref<EmployeeType[]>([])
const homeHeadings = ref<TableHeadingType[]>([])
const homeInputs = ref<InputType[]>([])
const user = ref<UserType>()

const loading = ref<boolean>(true)
const isModalOpen = ref<boolean>(false)
// const singleEmployee = ref<EmployeeType>(emptySingleEmployee)
const formErrors = ref(emptyEmployeeErrors)

const router = useRouter()

const resetForm = () => {
  formErrors.value = emptyEmployeeErrors
}

const submitForm = async (employee: EmployeeType) => {
  try {
    const response = await postData(employee, 'employee')
    addEmployee(response.data)
    // addMainData(response.data)
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
      // editMainData(employee)
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
      // removeMainData(id)
    } else {
      const responseData = await response?.json()
      showToast(responseData.message, 'error')
    }
  } catch (error) {
    console.error(error)
  }
}

const addEmployee = (employee: EmployeeType) => employees.value.push(employee)
const removeEmployee = (id: number) => {
  employees.value = employees.value.filter((emp) => emp.id !== id)
}

const signOut = async () => {
  router.push('/login')
  localStorage.removeItem('login-token')
  setTimeout(() => {
    showToast(`${user.value?.firstName} logged out`)
  }, 1000)
  if (user.value?.role === 'GUEST' && user.value.id) {
    await deleteData('users', user.value.id)
  }
}

const setModal = (value: boolean) => {
  isModalOpen.value = value
}

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>
