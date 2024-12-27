<template>
  <input :type="type" class="input" v-model="localValue" @input="updateValue(localValue)" />
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup(props, context) {
    const localValue = ref(props.value)

    const updateValue = (value: string) => {
      const dataName = context.attrs.dataName
      localValue.value = value
      context.emit('update-value', dataName, localValue)
    }

    return {
      localValue,
      updateValue,
    }
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  emits: ['update-value'],
}
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.input {
  padding: $small;
  background-color: $secondary-color;
  border: none;
  border-radius: $small-radius;
}
</style>