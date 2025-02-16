<template>
  <fieldset class="block">
    <slot name="label" />
    <slot name="input" />
    <span class="block__span" v-if="slots.error">
      <slot name="error" />
    </span>
  </fieldset>
</template>

<script setup lang="ts">
const slots = defineSlots()
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;
.block {
  position: relative;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__span {
    position: absolute;
    bottom: -50%;
    left: 0%;
  }
}
</style>
