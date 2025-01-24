<template>
  <input
    :value="props.modelValue"
    class="input"
    @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement)?.value)"
  />
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
  },
})

</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.input {
  width: 100%;
  height: 100%;
  padding: $small;
  background-color: $secondary-color;
  border: 1px solid $dark-color;
  border-radius: $small-radius;
}
</style>
