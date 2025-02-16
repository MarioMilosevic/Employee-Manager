<template>
  <header class="header">
    <h1
      :style="{ alignContent: props.align, color: props.color, marginBottom: props.marginBottom }"
      :class="[titleColor, 'title']"
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
    default: 'white',
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
  position: relative;

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

.title {
  position: relative;
}
</style>
