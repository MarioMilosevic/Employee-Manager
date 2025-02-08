<template>
  <LoadingSpinner v-if="loadingStore.loading" />
  <MainComponent
    v-else
    :inputs="dashboardInputs"
    page="dashboard"
    :user="user"
    :elements="users"
    :table-headings="dashboardHeadings"
    @delete-event="deleteUser"
  >
    <template #title> User Manager </template>
    <template #button>
      <ActionButton
        @click="goToHome"
        :style="{ position: 'absolute', top: '50%', right: '0%', transform: 'translateY(-50%)' }"
        >Homepage</ActionButton
      >
    </template>
    <template #subtitle> Users List </template>
    <template #leftButton>Add New User</template>
    <template #modalTitle>Add New User</template>
  </MainComponent>
</template>

<script setup lang="ts">
import MainComponent from 'src/components/layout/MainComponent.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { getData, deleteData } from 'src/api/api'
import { useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { useUserStore } from 'src/stores/userStore'
import { InputType, TableHeadingType, UserType } from 'src/utils/types'
import { useLoadingStore } from 'src/stores/loadingStore'
import { showToast } from 'src/utils/toast'

onBeforeMount(async () => {
  const [usersResponse, tableResponse, inputsResponse] = await Promise.all([
    getData('users'),
    getData('table/dashboard'),
    getData('inputs/admin'),
  ])
  users.value = usersResponse.data
  dashboardHeadings.value = tableResponse.data
  dashboardInputs.value = inputsResponse.data
  loadingStore.setLoading(false)
})

const { user } = useUserStore()
const loadingStore = useLoadingStore()

const users = ref<UserType[]>([])
const dashboardHeadings = ref<TableHeadingType[]>([])
const dashboardInputs = ref<InputType[]>([])
const router = useRouter()

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
}

const goToHome = () => {
  router.push('/')
}
</script>
