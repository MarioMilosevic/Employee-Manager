<template>
  <button class="option">
    <slot/>
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.option {
background-color: $primary-bright-color;
color: $secondary-color;
border-radius: $medium-radius;
cursor: pointer;
padding: $medium;
border: none;
}

</style>