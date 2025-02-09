<template>
  <aside class="sidebar">
ovo je sidebar
  </aside>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;
.sidebar {
  grid-column: 1 / 3;
  background-color: red;
}

</style>