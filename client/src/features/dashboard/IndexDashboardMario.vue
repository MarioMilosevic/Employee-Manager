<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <HeaderComp align="center">
      <template #title> Employee Manager </template>
      <template #button>
        <ActionButton
          @click="goToHome"
          :style="{ position: 'absolute', top: '50%', left: '0%', transform: 'translateY(-50%)' }"
          >Homepage</ActionButton
        >
      </template>
    </HeaderComp>
    <h2>User List</h2>
    <div class="buttons">
      <ActionButton color="white" size="big" @click="setModal(true)">
        Add New User
      </ActionButton>
      <ActionButton color="white" size="big" @click="signOut">Sign Out</ActionButton>
    </div>
    <TableList page="dashboard">
      <template #headings>
        <TableHeading v-for="heading in dashboardHeadings" :key="heading.id">
          {{ heading.name }}
        </TableHeading>
      </template>
      <template #elements>
        <TableElement
          v-for="user in users"
          :key="user.id"
          :element="user"
          :inputs="dashboardInputs"
        />
      </template>
    </TableList>


    <FormModal
      v-if="isModalOpen"
      :singleEmployee="singleUser"
      :inputs="dashboardInputs"
      @close-modal="setModal(false)"
      @submit-event="submitForm"
    />
  </template>
</template>

<script setup lang="ts">
import TableList from 'src/components/layout/TableList.vue'
import TableElement from 'src/components/layout/TableElement.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import HeaderComp from 'src/components/layout/HeaderComp.vue'
import TableHeading from 'src/components/layout/TableHeading.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import FormModal from 'src/components/form/FormModal.vue'
// import { useFetchSideData } from 'src/composables/useFetchSideData'
// import { useFetchData } from 'src/composables/useFetchData'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { UserType } from 'src/utils/types'

// const { data: users, addMainData, editMainData, removeMainData } = useFetchData('users/all')
// const { data: dashboardHeadings } = useFetchSideData('table/dashboard')
// const { data: dashboardInputs, loading } = useFetchSideData('inputs/admin')

const isModalOpen = ref<boolean>(false)
const singleUser = ref<UserType>()

const router = useRouter()

const setModal = (value: boolean) => {
  isModalOpen.value = value
}

const goToHome = () => {
  router.push('/')
}
</script>
