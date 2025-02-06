<template>
  <tr class="table__row">
    <td>{{ props.element.firstName }}</td>
    <td>{{ props.element.lastName }}</td>
    <td>{{ props.element.role }}</td>
    <td>{{ props.element.email }}</td>
    <ActionsRow @click="emit('edit-event')" />
  </tr>
</template>

<script setup lang="ts">
import ActionsRow from 'src/components/layout/ActionsRow.vue'
import { UserType } from 'src/utils/types'
import { PropType } from 'vue'

const props = defineProps({
  element: {
    type: Object as PropType<UserType>,
    required: true,
  },
})

const emit = defineEmits(['edit-event'])
</script>

<style scoped></style>
