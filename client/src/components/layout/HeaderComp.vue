<template>
  <header class="header">
    <h1 :style="{ alignContent: props.align, color: props.color }" :class="[titleColor, 'title']">
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
    default: 'white',
  },
})

const titleColor = computed(() => {
  return props.color
})
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/variables' as *;

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.white {
  color: $secondary-color;
}
.black {
  color: $dark-color;
}

.title {
  position: relative;
}
</style>
