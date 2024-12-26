<template>
  <input :id="id" :type="type" />
</template>

<script lang="ts">

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required:true
    }
  },
}
</script>

<style lang="scss" scoped></style>
