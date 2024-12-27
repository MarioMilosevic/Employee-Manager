<template>
  <span class="error">
    <slot />
  </span>
</template>


<style lang="scss" scoped>
@use 'src/scss/_variables' as *;
.error {
  color: $red-color;
  font-size: 0.7rem;
}
</style>
