<template>
  <table>
    <thead :class="['table__row', 'head', props.page]">
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

<style scoped lang="scss">
@use 'src/scss/abstracts/_mixins' as mixins;

.head {
  @include mixins.respond(small) {
    display: none;
  }
}
</style>
