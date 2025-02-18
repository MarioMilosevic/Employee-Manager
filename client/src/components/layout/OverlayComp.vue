<template>
  <div class="overlay">
    <slot/>
  </div>
</template>


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
}
</style>