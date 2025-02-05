<template>
  <TableList>
    <template #headings>
      <TableHeading v-for="heading in dashboardHeadings" :key="heading.id">
        {{ heading.name }}
      </TableHeading>
    </template>
    <template #elements>
      <TableElement v-for="user in users" :key="user.id" :element="user" :isMainPage="false"/>
    </template>
  </TableList>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getData } from 'src/api/api'
import { UserType } from 'src/utils/types'
import TableList from 'src/components/layout/TableList.vue'
import TableElement from 'src/components/layout/TableElement.vue'
import TableElementInfo from 'src/components/layout/TableElementInfo.vue'
import TableElementEdit from 'src/components/layout/TableElementEdit.vue'
import TableHeading from 'src/components/layout/TableHeading.vue'

const users = ref<UserType[]>([])
const dashboardHeadings = ref()

onBeforeMount(async () => {
  try {
    const [usersResponse, headingsResponse] = await Promise.all([
      getData('users/all'),
      getData('table/dashboard'),
    ])
    users.value = usersResponse.data
    dashboardHeadings.value = headingsResponse.data
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped></style>
