<template>
  <header class="header">
    <h1
      :style="{ alignContent: props.align, marginBottom: props.marginBottom }"
      :class="[titleColor]"
    >
      <slot name="title" />
    </h1>
    <slot name="button" />
  </header>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'

const props = defineProps({
  align: {
    type: String as PropType<'justify' | 'center' | 'end'>,
    default: 'justify',
  },
  color: {
    type: String as PropType<'white' | 'black'>,
    default: 'black',
  },
  marginBottom: {
    type: String,
    default: '0rem',
  },
})

const titleColor = computed(() => {
  return props.color
})
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/abstracts/_mixins' as mixins;

.header {
  display: flex;
  justify-content: center;
  align-items: center;

  @include mixins.respond(small) {
    justify-content: start;
  }
}

.white {
  color: $secondary-color;
}
.black {
  color: $dark-color;
}
</style>
