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
      <ActionButton v-if="user.role === 'ADMIN'" class="adminButton" @click="goToDashboard"
        >Dashboard</ActionButton
      >
    </template>
    <template #subtitle> Employee List </template>
    <template #leftButton>Add New Employee</template>
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
import { departmentOptions, employmentOptions, sortEmployeesOptions } from 'src/utils/constants'
import { onBeforeMount, ref, computed, watch } from 'vue'
import { deleteData, postData, editData, getData } from 'src/api/api'
import { showToast } from 'src/utils/toast'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/userStore'
import { useLoadingStore } from 'src/stores/loadingStore'
import { useSortFilterStore } from 'src/stores/sortFIlterOptionsStore'
import { usePageStore } from 'src/stores/pageStore'

onBeforeMount(async () => {
  try {
    loadingStore.setLoading(true)
    sortFilterOptionsStore.resetOptions()
    pageStore.resetStore()
    const [employeeResponse, tableResponse, inputsResponse] = await Promise.all([
      getData(
        `employee/${sortFilterOptionsStore.sortFilterOptions.department}/${sortFilterOptionsStore.sortFilterOptions.employment}/${sortFilterOptionsStore.sortFilterOptions.sort}/${pageStore.pageObj.page}/${pageStore.pageObj.itemsPerPage}/${sortFilterOptionsStore.searchValue}`,
      ),
      getData('table/main'),
      getData('inputs/home'),
    ])
    employees.value = employeeResponse.data.employees
    pageStore.setPageStore('elementsCount', employeeResponse.data.count)
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
const pageStore = usePageStore()

const employees = ref<EmployeeType[]>([])
const homeHeadings = ref<TableHeadingType[]>([])
const homeInputs = ref<InputType[]>([])

const optionsArray = computed(() => {
  return [departmentOptions, employmentOptions]
})

watch(
  [
    () => sortFilterOptionsStore.sortFilterOptions.sort,
    () => sortFilterOptionsStore.sortFilterOptions.employment,
    () => sortFilterOptionsStore.sortFilterOptions.department,
    () => pageStore.pageObj.page,
    () => pageStore.pageObj.itemsPerPage,
    () => sortFilterOptionsStore.searchValue,
  ],
  async ([newSort, newEmployment, newDepartment, newPage, newItemsPerPage, newSearchValue]) => {
    try {
      const { data } = await getData(
        `employee/${newDepartment}/${newEmployment}/${newSort}/${newPage}/${newItemsPerPage}/${newSearchValue}`,
      )
      employees.value = data.employees
      pageStore.setPageStore('elementsCount', data.count)
    } catch (error) {
      showToast('Unexpected error occured', 'error')
      console.error('Error fetching employees:', error)
    }
  },
)

const router = useRouter()

const submitForm = async (employee: EmployeeType) => {
  try {
    const response = await postData(employee, 'employee')
    addEmployee(response.data)
    pageStore.setPageStore('elementsCount', pageStore.pageObj.elementsCount + 1)
    pageStore.setPageStore('itemsPerPage', pageStore.pageObj.itemsPerPage + 1)
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
      pageStore.setPageStore('elementsCount', pageStore.pageObj.elementsCount - 1)
      pageStore.setPageStore('itemsPerPage', pageStore.pageObj.itemsPerPage - 1)
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

const goToDashboard = () => {
  router.push('/dashboard')
  router.push({
    path: '/dashboard',
    query: {
      role: sortFilterOptionsStore.sortFilterOptions.role.toLowerCase(),
      sort: sortFilterOptionsStore.sortFilterOptions.sort.toLowerCase(),
    },
  })
}
</script>
