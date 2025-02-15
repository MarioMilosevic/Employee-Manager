<template>
  <select
    :class="['select', props.color]"
    :value="modelValue"
    @change="(e) => emits('update:modelValue', (e.target as HTMLSelectElement).value)"
  >
    <option v-for="(option, index) in props.options" :key="index" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  options: {
    type: Array,
  },
  color: {
    type: String,
    default: 'white',
  },
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
})

const emits = defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.select {
  border-radius: $small-radius;
  border: none;
}

.white {
  padding: 0.6rem;
  background-color: $secondary-color;
  border: 1px solid $dark-color;
}

.purple {
  background-color: $primary-dark-color;
  color: $secondary-color;
  padding: 0.3rem;
}
</style>
