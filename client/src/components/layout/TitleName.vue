<template>
  <h1 :style="{ textAlign: props.align, color:props.color, paddingBottom:'2rem' }" :class="titleColor">
    <slot />
  </h1>
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
@use "src/scss/abstracts/variables" as *;

.white {
  color:$secondary-color;
}
.black {
  color: $dark-color;
}
</style>
