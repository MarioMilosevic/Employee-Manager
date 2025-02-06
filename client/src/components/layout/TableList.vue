<template>
  <table class="table">
    <thead :class="['table__row', props.page]">
      <slot name="headings" />
    </thead>
    <slot name="elements" />
  </table>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  page: {
    type: String as PropType<'home' | 'dashboard'>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.table {
  display: flex;
  flex-direction: column;
}
</style>
