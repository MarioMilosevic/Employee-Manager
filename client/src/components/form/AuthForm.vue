<template>
  <form class="form">
    <slot name="title" />
    <slot v-for="input in props.inputs" :key="input.id" :name="input.name" />
    <!-- <slot name="firstName" />
    <slot name="lastName" />
    <slot name="email" />
    <slot name="password" />
    <slot name="confirmPassword"/> -->
    <slot name="submit" />
    <slot name="text" />
  </form>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { InputType } from 'src/utils/types'

const props = defineProps({
  inputs: {
    type: Array as PropType<InputType[]>,
  },
})
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.form {
  display: flex;
  flex-direction: column;
  gap: $medium;
  background-color: $primary-shade-color;
  background-color: $secondary-color;
  padding: $big $very-big;
  width: 400px;
  margin: 5rem auto;
  border-radius: $medium-radius;
}
</style>
