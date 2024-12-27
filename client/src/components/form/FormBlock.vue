<template>
  <div class="block">
    <slot name="input"/>
    <span class="block__span">
      <slot name="error"/>
    </span>
  </div>
</template>

<style lang="scss" scoped>
  @use "src/scss/_variables" as *;
.block {
  position: relative;

  &__span {
    position: absolute;
    bottom: -50%;
    left: 0%;
  }
}

</style>