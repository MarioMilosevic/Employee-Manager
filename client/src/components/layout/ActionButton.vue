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
      type: String as PropType<'white' | 'red' | 'green'>,
      default: 'white',
    },
    type: {
      type: String,
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
  }

  &.green {
    background-color: $green-color;
  }
}
</style>
