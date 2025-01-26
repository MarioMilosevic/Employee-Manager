<template>
  <h1 :style="{ textAlign: props.align }">
    <slot />
  </h1>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  align: {
    type: String as PropType<'justify' | 'center' | 'end'>,
    default: 'justify',
  },
})
</script>
