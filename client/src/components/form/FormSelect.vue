<template>
  <select class="select" :value="modelValue">
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
    required:true
  }
})

console.log(props.modelValue)

</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.select {
  padding: 0.6rem;
  border-radius: $small-radius;
  border: none;
  height: fit-content;
  background-color: $secondary-color;
}

</style>
