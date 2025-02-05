<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <HeaderComp align="center">
      <template #title> Employee Manager </template>
      <template #button v-if="user?.role === 'ADMIN'">
        <ActionButton
        @click="goToDashboard"
          :style="{ position: 'absolute', top: '50%', right: '0%', transform: 'translateY(-50%)' }"
          >Dashboard</ActionButton
        >
      </template>
    </HeaderComp>
    <h2>Employee List</h2>
    <div class="buttons">
      <ActionButton color="white" size="big" @click="setModal(true)">
        Add New Employee
      </ActionButton>
      <ActionButton color="white" size="big" @click="signOut">Sign Out</ActionButton>
    </div>

    <TableList>
      <template #headings>
        <TableHeading v-for="heading in tableHeadings" :key="heading.id">
          {{ heading.name }}
        </TableHeading>
      </template>
      <template #elements>
        <TableElement
          v-for="employee in employees"
          :key="employee.id"
          :element="employee"
          :inputs="homeInputs"
          :isMainPage="true"
          @delete-event="deleteEmployee"
          @edit-event="editEmployee"
        />
      </template>
    </TableList>

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
import TableList from 'src/components/layout/TableList.vue'
import HeaderComp from 'src/components/layout/HeaderComp.vue'
import TableElement from 'src/components/layout/TableElement.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import TableHeading from 'src/components/layout/TableHeading.vue'
import { emptyEmployeeErrors, emptySingleEmployee } from 'src/utils/constants'
import { EmployeeType, UserType } from 'src/utils/types'
import { ref, onBeforeMount } from 'vue'
import { getData, deleteData, postData, editData, getUserData } from 'src/api/api'
import { showToast } from 'src/utils/toast'
import { useRouter } from 'vue-router'

onBeforeMount(async () => {
  try {
    const [employeeResponse, homeResponse, tableResponse] = await Promise.all([
      getData('employee'),
      getData('inputs/home'),
      getData('table/main')
    ])
    employees.value = employeeResponse.data
    homeInputs.value = homeResponse.data
    tableHeadings.value = tableResponse.data
    loading.value = false
    const token = localStorage.getItem('login-token')
    
    const response = await getUserData(token as string)
    user.value = response.data
    setTimeout(() => {
      showToast(`Welcome back ${user.value?.firstName}`)
    }, 1000)
  } catch (error) {
    console.error(error)
  }
})

const user = ref<UserType>()
const employees = ref([] as EmployeeType[])
const isModalOpen = ref<boolean>(false)
const homeInputs = ref()
const singleEmployee = ref<EmployeeType>(emptySingleEmployee)
const formErrors = ref(emptyEmployeeErrors)
const loading = ref<boolean>(true)
const tableHeadings = ref()

const router = useRouter()

const addEmployee = (employee: EmployeeType) => employees.value.push(employee)

const removeEmployee = (id: number) => {
  employees.value = employees.value.filter((emp) => emp.id !== id)
}

const resetForm = () => {
  formErrors.value = emptyEmployeeErrors
}

const submitForm = async (employee: EmployeeType) => {
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
      showToast(responseData.message, 'error')
    }
  } catch (error) {
    console.error(error)
  }
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

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
