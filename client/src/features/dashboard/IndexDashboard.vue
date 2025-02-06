<template>
  <LoadingSpinner v-if="loading" />
  <TableList v-else>
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
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getData } from 'src/api/api'
import { UserType } from 'src/utils/types'
import TableList from 'src/components/layout/TableList.vue'
import TableElement from 'src/components/layout/TableElement.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import TableHeading from 'src/components/layout/TableHeading.vue'

const users = ref<UserType[]>([])
const dashboardHeadings = ref()
const dashboardInputs = ref()
const loading = ref<boolean>(true)

onBeforeMount(async () => {
  try {
    const [usersResponse, headingsResponse, inputsResponse] = await Promise.all([
      getData('users/all'),
      getData('table/dashboard'),
      getData('inputs/admin'),
    ])
    dashboardHeadings.value = headingsResponse.data
    users.value = usersResponse.data
    dashboardInputs.value = inputsResponse.data
    loading.value = false
  } catch (error) {
    console.error(error)
  }
})
</script>
