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
      <p>First Name: {{ firstName }}</p>
      <p>Last Name: {{ lastName }}</p>
      <p>Start Year: {{ startYear }}</p>
      <p>Address: {{ address }}</p>
      <p>Has completed training ? {{ trainingCompleted }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import ActionButton from 'src/components/layout/ActionButton.vue'
import { EmployeeType } from 'src/utils/types'
import { PropType } from 'vue'

export default {
  setup(props, {emit}) {
    const { firstName, lastName, address, startYear, trainingCompleted, id } = props.employee

    const editHandler = () => {
      emit('edit-event', id)
      console.log('treba edit da bude', id)
    }

    const deleteHandler = () => {
      emit('delete-event', id)
      console.log('treba da brise', id)
    }


    return {
      firstName,
      lastName,
      address,
      startYear,
      trainingCompleted,
      editHandler,
      deleteHandler
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
emits:['edit-event', 'delete-event'],
}
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.wrapper {
  margin: 0 auto;
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
