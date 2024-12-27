<template>
  <div class="wrapper">
    <h1>Employee Info</h1>
    <div class="wrapper__info">
      <p>First Name: {{ firstName }}</p>
      <p>Last Name: {{ lastName }}</p>
      <p>Start Year: {{ startYear }}</p>
      <p>Address: {{ address }}</p>
      <p>Has completed training ? {{ trainingCompleted }}</p>
    </div>
    <ActionButton>Edit</ActionButton>
    <ActionButton>Delete</ActionButton>
  </div>
</template>

<script lang="ts">
import ActionButton from 'src/components/layout/ActionButton.vue'
import { EmployeeType } from 'src/utils/types'
import { PropType, onMounted } from 'vue'

export default {
  setup(props) {
    onMounted(() => {
      console.log(props.employee) // Access the prop here
    })

    const { firstName, lastName, address, startYear, trainingCompleted } = props.employee

    return {
      firstName,
      lastName,
      address,
      startYear,
      trainingCompleted,
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
}
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.wrapper {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: $medium;
  background-color: #552676;
  padding: $medium;
  border-radius: $small-radius;

  &__info {
    padding: $medium;
    display: flex;
    gap: $medium;
  }
}
</style>
