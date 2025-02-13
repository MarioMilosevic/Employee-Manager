<template>
  <tr class="table__row">
    <td>{{ props.element.fullName }}</td>
    <td>{{ props.element.role }}</td>
    <td>{{ props.element.email }}</td>
    <td>{{ props.element.createdDate }}</td>
    <BaseIcon size="big" stroke="#ef4444" @click="emits('delete-event')">
      <DeleteIcon />
    </BaseIcon>
  </tr>
</template>

<script setup lang="ts">
import { UserType } from 'src/utils/types'
import { PropType } from 'vue'
import BaseIcon from 'src/icons/BaseIcon.vue'
import DeleteIcon from 'src/icons/DeleteIcon.vue'

const props = defineProps({
  element: {
    type: Object as PropType<UserType>,
    required: true,
  },
})

const emits = defineEmits(['delete-event'])

</script>

<style scoped></style>
