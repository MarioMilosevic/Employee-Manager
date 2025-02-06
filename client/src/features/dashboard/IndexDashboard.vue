<template>
  <LoadingSpinner v-if="loading" />
  <TableList v-else page="dashboard">
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
import TableList from 'src/components/layout/TableList.vue'
import TableElement from 'src/components/layout/TableElement.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import TableHeading from 'src/components/layout/TableHeading.vue'
import { useFetchData } from 'src/composables/useFetchData'
import { useFetchMainData } from 'src/composables/useFetchMainData'

const { data: users, addMainData, editMainData, removeMainData } = useFetchMainData('users/all')
const {
  inputsData: dashboardInputs,
  tableData: dashboardHeadings,
  loading,
} = useFetchData('inputs/admin', 'table/dashboard')
</script>
