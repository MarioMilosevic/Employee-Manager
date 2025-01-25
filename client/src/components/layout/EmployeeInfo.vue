<template>
  <tr class="table__row employee">
    <td>{{ fullName }}</td>
    <td>{{ employee.address }}</td>
    <td>{{ employee.startYear }}</td>
    <td>{{ employee.trainingCompleted }}</td>
    <td class="employee__actions">
      <BaseIcon size="big" @click="editHandler"><EditIcon /></BaseIcon>
      <BaseIcon size="big"><DeleteIcon /></BaseIcon>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { EmployeeType } from 'src/utils/types'
import { PropType, computed } from 'vue'
import BaseIcon from 'src/icons/BaseIcon.vue'
import EditIcon from 'src/icons/EditIcon.vue'
import DeleteIcon from 'src/icons/DeleteIcon.vue'

const props = defineProps({
  employee: {
    type: Object as PropType<EmployeeType>,
    required: true,
  },
})
const emit = defineEmits(['edit-event', 'delete-event'])

const fullName = computed(() => {
  return `${props.employee.firstName} ${props.employee.lastName}`
})



const editHandler = () => {
  console.log('mario')
  // emit('edit-event', props.employee.id)
}

const deleteHandler = () => {
  emit('delete-event', props.employee.id)
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/base/_utilities';

.employee {
  background-color: $secondary-color;
  color: black;
  /* padding: $medium 0; */

  &__actions {
    display: flex;
    gap: $medium;
    align-items: center;
  }
}

/*
.wrapper {
  display: flex;
  flex-direction: column;
  gap: $medium;
  background-color: $primary-shade-color;
  border-radius: $small-radius;
  position: relative;

  &__title {
    display: flex;
    gap: $very-big;
    align-items: center;

    &-buttons {
      display: flex;
      gap: $medium;
      align-items: center;
    }
  }

  &__info {
    display: flex;
    gap: $medium;
  }
} */
</style>
