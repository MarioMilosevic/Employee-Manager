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
  border: 1px solid $dark-color;
  width: 100%;
}


</style>
