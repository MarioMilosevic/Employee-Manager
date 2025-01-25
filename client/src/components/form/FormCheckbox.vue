<template>
  <label for="training" class="switch">
    <input
      class="switch__input"
      id="training"
      type="checkbox"
      :checked="initialValue"
      @change="toggleCompleted"
    />
    <span class="switch__slider slider"></span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  trainingCompleted: {
    type: Boolean,
    required: true,
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

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  &__input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  &__slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;

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
      /* transform: translateX(26px); */
    }
  }
}
</style>
