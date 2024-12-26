<template>
  <div class="block">
    <slot name="label" />
    <slot name="input" />
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.block {
  border: 1px solid black;
  display: flex;
  gap: $medium;
}
</style>
