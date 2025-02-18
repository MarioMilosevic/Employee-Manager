<template>
  <div class="overlay">
    <div class="overlay__modal">
      <slot name="button" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.overlay {
  z-index: 10;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.6);

  &__modal {
    border-radius: $medium-radius;
    z-index: 20;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    gap: $very-big;
  }
}
</style>
