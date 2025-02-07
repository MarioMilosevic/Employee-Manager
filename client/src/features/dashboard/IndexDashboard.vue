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
import { useFetchSideData } from 'src/composables/useFetchSideData'
import { useFetchData } from 'src/composables/useFetchData'

const { data: users, addMainData, editMainData, removeMainData } = useFetchData('users/all')
const { data: dashboardHeadings } = useFetchSideData('table/dashboard')
const { data: dashboardInputs, loading } = useFetchSideData('inputs/admin')
</script>
