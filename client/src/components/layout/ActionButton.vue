<template>
  <button :class="['button', props.color, `button-${props.size}`]" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  color: {
    type: String as PropType<'white' | 'red' | 'green' | 'purple'>,
    default: 'white',
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

  &.white {
    color: $dark-color;
    background-color: $secondary-color;

    &:hover {
      background-color: $secondary-shade-color;
    }
  }

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

  &.purple {
    background-color: $primary-color;
    color: $secondary-color;
    &:hover {
      background-color: $primary-shade-color;
    }
  }
}


</style>
