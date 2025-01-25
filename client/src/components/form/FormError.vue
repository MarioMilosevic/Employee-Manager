<template>
  <span class="error">
    <slot />
  </span>
</template>


<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;
.error {
  color: $red-color;
  font-size: 0.9rem;
}
</style>
