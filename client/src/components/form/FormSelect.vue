<template>
  <select
    class="select"
    :value="modelValue"
    @change="(e) => emits('update:modelValue', (e.target as HTMLSelectElement).value)"
  >
    <option v-for="(option, index) in props.options" :key="index" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array,
  },
  modelValue: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.select {
  padding: 0.6rem;
  border-radius: $small-radius;
  border: none;
  background-color: $secondary-color;
  outline: none;
  border: 1px solid $dark-color;
}
</style>
