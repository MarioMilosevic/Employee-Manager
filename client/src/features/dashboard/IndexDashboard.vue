<template>
  <LoadingSpinner v-if="loading" />
  <MainComponent
    v-else
    :inputs="dashboardInputs"
    page="dashboard"
    :user="user"
    :elements="users"
    :table-headings="dashboardHeadings"
    @delete-event="deleteUser"
  >
  <template #title>
    User Manager
  </template>
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
import { getData, getUserData } from 'src/api/api'
import { useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { InputType, TableHeadingType, UserType } from 'src/utils/types'

onBeforeMount(async () => {
  const token = localStorage.getItem('login-token')
  const [usersResponse, tableResponse, inputsResponse, userResponse] = await Promise.all([
    getData('users/all'),
    getData('table/dashboard'),
    getData('inputs/admin'),
    getUserData(token as string),
  ])
  users.value = usersResponse.data
  dashboardHeadings.value = tableResponse.data
  dashboardInputs.value = inputsResponse.data
  user.value = userResponse.data
  loading.value = false
})

const loading = ref<boolean>(true)
const users = ref<UserType[]>([])
const dashboardHeadings = ref<TableHeadingType[]>([])
const dashboardInputs = ref<InputType[]>([])
const user = ref<UserType>()
const router = useRouter()

const deleteUser = async (id: number) => {
  console.log('radi')
  console.log(id)
}

const goToHome = () => {
  router.push('/')
}
</script>
