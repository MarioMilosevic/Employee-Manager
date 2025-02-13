<template>
  <LoadingSpinner v-if="loadingStore.loading" />
  <MainComponent
    v-else
    :elements="employees"
    :inputs="homeInputs"
    :table-headings="homeHeadings"
    :options="optionsArray"
    :sortOptions="sortEmployeesOptions"
    :user="user"
    page="home"
    @delete-event="deleteEmployee"
    @edit-event="editEmployee"
    @submit-event="submitForm"
  >
    <template #title> Employee Manager </template>
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
    <template #modalTitle>Add New Employee</template>
    <template #firstFilter>{{ departmentOptions }}</template>
    <template #secondFilter>{{ employmentOptions }}</template>
  </MainComponent>
</template>

<script setup lang="ts">
import MainComponent from 'src/components/layout/MainComponent.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { EmployeeType, InputType, TableHeadingType } from 'src/utils/types'
import {
  departmentOptions,
  employmentOptions,
  sortEmployeesOptions,
} from 'src/utils/constants'
import { onBeforeMount, ref, computed, watch } from 'vue'
import { deleteData, postData, editData, getData } from 'src/api/api'
import { showToast } from 'src/utils/toast'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/userStore'
import { useLoadingStore } from 'src/stores/loadingStore'
import { useSortFilterStore } from 'src/stores/sortFIlterOptionsStore'

onBeforeMount(async () => {
  try {
    loadingStore.setLoading(true)
    const [employeeResponse, tableResponse, inputsResponse] = await Promise.all([
      getData(
        `employee/${sortFilterOptionsStore.sortFilterOptions.department}/${sortFilterOptionsStore.sortFilterOptions.employment}/${sortFilterOptionsStore.sortFilterOptions.sort}`,
      ),
      getData('table/main'),
      getData('inputs/home'),
    ])
    employees.value = employeeResponse.data
    homeHeadings.value = tableResponse.data
    homeInputs.value = inputsResponse.data
    loadingStore.setLoading(false)
  } catch (error) {
    console.error(error)
  }
})

const { user } = useUserStore()
const loadingStore = useLoadingStore()
const sortFilterOptionsStore = useSortFilterStore()

const employees = ref<EmployeeType[]>([])
const homeHeadings = ref<TableHeadingType[]>([])
const homeInputs = ref<InputType[]>([])

const isModalOpen = ref<boolean>(false)

const optionsArray = computed(() => {
  return [departmentOptions, employmentOptions]
})

watch(sortFilterOptionsStore.sortFilterOptions, async () => {
  const { data } = await getData(
    `employee/${sortFilterOptionsStore.sortFilterOptions.department}/${sortFilterOptionsStore.sortFilterOptions.employment}/${sortFilterOptionsStore.sortFilterOptions.sort}`,
  )
  employees.value = data
})

const router = useRouter()

const submitForm = async (employee: EmployeeType) => {
  try {
    const response = await postData(employee, 'employee')
    addEmployee(response.data)
    // addMainData(response.data)
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

const setModal = (value: boolean) => {
  isModalOpen.value = value
}

const goToDashboard = () => {
  router.push('/dashboard')
  router.push({
    path: '/dashboard',
    query: {
      role: sortFilterOptionsStore.sortFilterOptions.role,
    },
  })
}
</script>
