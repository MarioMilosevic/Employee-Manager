<template>
  <tr class="table__row">
    <td>{{ props.element.firstName }}</td>
    <td>{{ props.element.lastName }}</td>
    <td>{{ props.element.role }}</td>
    <td>{{ props.element.email }}</td>
    <td>{{ props.element.createdDate }}</td>
  </tr>
</template>

<script setup lang="ts">
import { UserType } from 'src/utils/types'
import { PropType } from 'vue'

const props = defineProps({
  element: {
    type: Object as PropType<UserType>,
    required: true,
  },
})

</script>

<style scoped></style>
