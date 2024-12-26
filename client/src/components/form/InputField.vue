<template>
  <input :type="type" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped></style>
