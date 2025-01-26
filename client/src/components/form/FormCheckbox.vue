<template>
  <input :id="props.id" type="checkbox" :checked="initialValue" @change="toggleCompleted" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  trainingCompleted: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: false,
  },
})

const emits = defineEmits(['checkbox-event'])
const initialValue = ref(props.trainingCompleted)

const toggleCompleted = (event: Event) => {
  const value = (event.target as HTMLInputElement).checked
  emits('checkbox-event', value)
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.label {
  position: relative;
  border: 1px solid black;
  width: 100%;

  /* &__slider {
  background-color: red;
  position: absolute;
  top: 0;
  right: 0;
  left:0;
  bottom:0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px; */

  /* &::before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    } */
  /* } */
}

/* .switch {
  position: relative;
  width: 60px;
  height: 34px;

  &__slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &::before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  &__input:checked + .slider {
    background-color: $primary-color;

    &::before {
      transform: translateX(26px);
    }
  }
} */
</style>
