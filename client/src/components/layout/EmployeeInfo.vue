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
      <p>First Name: {{ singleEmployee.firstName }}</p>
      <p>Last Name: {{ singleEmployee.lastName }}</p>
      <p>Start Year: {{ singleEmployee.startYear }}</p>
      <p>Address: {{ singleEmployee.address }}</p>
      <p>Has completed training ? {{ singleEmployee.trainingCompleted }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import ActionButton from 'src/components/layout/ActionButton.vue'
import { EmployeeType } from 'src/utils/types'
import { PropType, ref, watch } from 'vue'

export default {
  setup(props, { emit }) {
    const singleEmployee = ref({ ...props.employee })

    const editHandler = () => {
      emit('edit-event', singleEmployee.value.id)
    }

    const deleteHandler = () => {
      emit('delete-event', singleEmployee.value.id)
    }

    watch(
      () => props.employee,
      (newValue) => {
        singleEmployee.value = { ...newValue } 
      },
    )

    return {
      singleEmployee,
      editHandler,
      deleteHandler,
    }
  },
  props: {
    employee: {
      type: Object as PropType<EmployeeType>,
      required: true,
    },
  },
  components: {
    ActionButton,
  },
  emits: ['edit-event', 'delete-event'],
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
