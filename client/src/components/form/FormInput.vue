<template>
  <input :type="type" class="input"/>
</template>

<script lang="ts">

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@use "src/scss/_variables" as *;

.input {
  padding: $small;
  background-color: $secondary-color;
  border: none;
  border-radius: $small-radius;
}

</style>
