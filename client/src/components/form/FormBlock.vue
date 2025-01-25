<template>
  <fieldset class="block">
    <slot name="input" />
    <span class="block__span">
      <slot name="error" />
    </span>
  </fieldset>
</template>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;
.block {
  position: relative;
  border: none;

  &__span {
    position: absolute;
    bottom: -50%;
    left: 0%;
  }
}
</style>
