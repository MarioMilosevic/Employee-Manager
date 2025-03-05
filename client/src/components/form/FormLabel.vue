<template>
  <label :for="props.id" :class="['label', { border: props.border }]">
    <slot />
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/abstracts/_mixins' as mixins;

.label {
  position: relative;
  color: $dark-color;
  width: 100%;
  height: 100%;
  padding: $small;
  background-color: $secondary-color;
  border-radius: $small-radius;

  @include mixins.respond(small) {
    font-size: $medium-font;
    /* width:55% */
    /* width: 55%; */
  }
}
</style>
