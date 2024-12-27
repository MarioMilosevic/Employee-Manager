<template>
  <form class="form">
    <div class="form__inputs">
      <slot name="firstName" />
      <slot name="lastName" />
      <slot name="startYear" />
      <slot name="address" />
      <slot name="trainingCompleted" />
      <slot name="submit" />
    </div>
  </form>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;
.form {
  display: flex;
  flex-direction: column;
  gap: $big;
  align-items: start;
  background-color: $primary-shade-color;
  padding: $medium;
  border-radius: $small-radius;

  &__inputs {
    display: flex;
    gap: $medium;
  }
}
</style>
