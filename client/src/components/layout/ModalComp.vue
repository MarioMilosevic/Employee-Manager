<template>
  <div class="modal">
    <slot name="button" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.modal {
  border-radius: $medium-radius;
  z-index: 20;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $very-big;
}
</style>
