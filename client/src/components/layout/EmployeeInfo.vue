<template>
  <div class="wrapper">
    <div class="wrapper__title">
      <h1>Employee Info</h1>
      <div class="wrapper__title-buttons">
        <ActionButton @click="editHandler" color="green">Edit</ActionButton>
        <ActionButton @click="deleteHandler" color="red">Delete</ActionButton>
      </div>
    </div>
    <div class="wrapper__info">
      <p>First Name: {{ employee.firstName }}</p>
      <p>Last Name: {{ employee.lastName }}</p>
      <p>Start Year: {{ employee.startYear }}</p>
      <p>Address: {{ employee.address }}</p>
      <p>Has completed training ? {{ employee.trainingCompleted }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from 'src/components/layout/ActionButton.vue'
import { EmployeeType } from 'src/utils/types'
import { PropType } from 'vue'

const props = defineProps({
  employee: {
    type: Object as PropType<EmployeeType>,
    required: true,
  },
})
const emit = defineEmits(['edit-event', 'delete-event'])

const editHandler = () => {
  emit('edit-event', props.employee.id)
}

const deleteHandler = () => {
  emit('delete-event', props.employee.id)
}
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.wrapper {
  display: flex;
  flex-direction: column;
  gap: $medium;
  padding: $medium $big;
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
}
</style>
