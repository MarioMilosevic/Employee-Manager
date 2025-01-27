<template>
  <input
    :id="props.id"
    type="checkbox"
    :class="checkboxClass"
    :checked="props.trainingCompleted"
    @change="toggleCompleted"

  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  trainingCompleted: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default:undefined
  }
})

const checkboxClass = computed(() => {
  return props.disabled ? 'disabled' : undefined
})


const emits = defineEmits(['checkbox-event'])

const toggleCompleted = (event: Event) => {
  const value = (event.target as HTMLInputElement).checked
  emits('checkbox-event', value)
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;


.disabled{
  pointer-events: none;
}


input[type='checkbox'] {
  accent-color: $primary-color;
}

input[type='checkbox']:focus {
  outline: none;
  box-shadow: 0 0 0 2px $primary-color;
}

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
