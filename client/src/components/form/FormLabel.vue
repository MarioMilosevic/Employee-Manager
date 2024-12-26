<template>
  <label class="label" :for="id">
    <slot name="text"/>
  </label>
</template>

<script lang="ts">
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.label {

}
</style>
