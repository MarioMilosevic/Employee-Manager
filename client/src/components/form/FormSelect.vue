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
@use 'src/scss/abstracts/_mixins' as mixins;

.select {
  border-radius: $small-radius;
  border: none;

  @include mixins.respond(small) {
    font-size: $medium-font;
  }
}

.white {
  padding: 0.6rem;
  background-color: $secondary-color;
  border: 1px solid $dark-color;

  @include mixins.respond(small) {
    padding: 0.5rem;
    font-size: $medium-font;
  }
}

.purple {
  background-color: $primary-dark-color;
  color: $secondary-color;
  padding: 0.3rem;
}
</style>
