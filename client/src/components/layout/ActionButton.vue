<template>
  <button :class="['button', props.color, `button-${props.size}`]" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  color: {
    type: String as PropType< 'red' | 'green' | 'blue' | 'sky'>,
    default: 'blue',
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'big'>,
    default:'medium'
  },
})

</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.button {
  border: none;
  cursor: pointer;
  border-radius: $small-radius;
  font-size: $medium;
    transition: all 0.3s;

  &.red {
    background-color: $red-color;
    color: $secondary-color;

    &:hover {
      background-color: $red-color-hover;
    }
  }

  &.green {
    background-color: $green-color;
    color: $secondary-color;

    &:hover {
      background-color: $green-color-hover;
    }
  }

  &.blue {
    background-color: $terniary-color;
    color: $secondary-color;
    &:hover {
      background-color: $terniary-color-hover;
    }
  }

  &.sky {
    background-color: $primary-color;
  }
}


</style>
