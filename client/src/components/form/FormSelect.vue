<template>
  <select class="select">
    <option v-for="(option, index) in options" :key="index" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array,
  },
})

console.log(props.options)
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.select {
  padding: $small;
  border-radius: $medium-radius;
  border: none;
  height: fit-content;

  background-color: $secondary-color;
}

</style>
