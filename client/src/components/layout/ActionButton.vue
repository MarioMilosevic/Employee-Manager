<template>
  <button :class="['button', buttonColor]" :type="type">
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, PropType } from 'vue'
export default {
  setup(props) {
    const buttonColor = computed(() => {
      return props.color
    })

    return {
      buttonColor,
    }
  },
  props: {
    color: {
      type: String as PropType<'white' | 'red' | 'green' | 'purple'>,
      default: 'white',
    },
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
  },
}
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.button {
  border: none;
  cursor: pointer;
  padding: $small $medium;
  border-radius: $small-radius;

  &.white {
    color: $dark-color;
    background-color: $secondary-color;
  }

  &.red {
    background-color: $red-color;

    &:hover {
      background-color: $red-color-hover;
    }
  }

  &.green {
    background-color: $green-color;

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
