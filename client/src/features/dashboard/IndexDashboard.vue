<template>
  <LoadingSpinner v-if="loadingStore.loading" />
  <MainComponent
    v-else
    :elements="users"
    :inputs="dashboardInputs"
    :table-headings="dashboardHeadings"
    :options="[userRoles]"
    :sortOptions="sortUsersOptions"
    :user="user"
    page="dashboard"
    @delete-event="deleteUser"
  >
    <template #title> User Manager </template>
    <template #button>
      <ActionButton class="adminButton" @click="goToHome">Homepage</ActionButton>
    </template>
    <template #subtitle> Users List </template>
    <template #modalTitle>Add New User</template>
  </MainComponent>
</template>

<script setup lang="ts">
import MainComponent from 'src/components/layout/MainComponent.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { getData, deleteData } from 'src/api/api'
import { useRouter } from 'vue-router'
import { onBeforeMount, ref, watch } from 'vue'
import { useUserStore } from 'src/stores/userStore'
import { InputType, TableHeadingType, UserType } from 'src/utils/types'
import { useLoadingStore } from 'src/stores/loadingStore'
import { sortUsersOptions, userRoles } from 'src/utils/constants'
import { showToast } from 'src/utils/toast'
import { useSortFilterStore } from 'src/stores/sortFIlterOptionsStore'
import { usePageStore } from 'src/stores/pageStore'

onBeforeMount(async () => {
  try {
    loadingStore.setLoading(true)
    sortFilterOptionsStore.resetOptions()
    pageStore.resetStore()
    const [usersResponse, tableResponse, inputsResponse] = await Promise.all([
      getData(
        `users/${sortFilterOptionsStore.sortFilterOptions.role.toUpperCase()}/${sortFilterOptionsStore.sortFilterOptions.sort}/${pageStore.pageObj.page}/${pageStore.pageObj.itemsPerPage}`,
      ),
      getData('table/dashboard'),
      getData('inputs/admin'),
    ])
    users.value = usersResponse.data.users
    pageStore.setPageStore('elementsCount', usersResponse.data.count)
    dashboardHeadings.value = tableResponse.data
    dashboardInputs.value = inputsResponse.data
    loadingStore.setLoading(false)
  } catch (error) {
    console.error(error)
  }
})

const { user } = useUserStore()
const loadingStore = useLoadingStore()
const sortFilterOptionsStore = useSortFilterStore()
const pageStore = usePageStore()
const users = ref<UserType[]>([])
const dashboardHeadings = ref<TableHeadingType[]>([])
const dashboardInputs = ref<InputType[]>([])
const router = useRouter()

watch(
  [
    () => sortFilterOptionsStore.sortFilterOptions.sort,
    () => sortFilterOptionsStore.sortFilterOptions.role,
    () => pageStore.pageObj.page,
    () => pageStore.pageObj.itemsPerPage,
  ],
  async ([newSort, newRole, newPage, newItemsPerPage]) => {
    try {
      const { data } = await getData(
        `users/${newRole.toUpperCase()}/${newSort}/${newPage}/${newItemsPerPage}`,
      )
      users.value = data.users
      pageStore.setPageStore('elementsCount', data.count)
    } catch (error) {
      showToast('Unexpected error occured', 'error')
      console.error('Error fetching employees:', error)
    }
  },
)

const deleteUser = async (id: number) => {
  try {
    const response = await deleteData('users', id)
    if (response && response.ok) {
      removeUser(id)
      showToast(`User with id ${id} has been deleted`)
    } else {
      const responseData = await response?.json()
      showToast(responseData.message, 'error')
    }
  } catch (error) {
    console.error(error)
  }
}

const removeUser = (id: number) => {
  users.value = users.value.filter((user) => user.id !== id)
  pageStore.setPageStore('elementsCount', pageStore.pageObj.elementsCount - 1)
}

const goToHome = () => {
  router.push({
    path: '/',
    query: {
      department: sortFilterOptionsStore.sortFilterOptions.department.toLowerCase(),
      employment: sortFilterOptionsStore.sortFilterOptions.employment.toLowerCase(),
      sort: sortFilterOptionsStore.sortFilterOptions.sort.toLowerCase(),
    },
  })
}
</script>
