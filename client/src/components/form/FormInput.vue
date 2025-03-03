<template>
  <input
    :value="props.modelValue"
    class="input"
    :style="{textAlign:`${props.align}`}"
    @blur="emit('blur-event')"
    @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement)?.value)"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

const emit = defineEmits(['update:modelValue', 'blur-event'])

const props = defineProps({
  modelValue: {
    type: String,
  },
  align:{
    type:String as PropType<'justify' | 'center' | 'end'>,
    default:'justify'
  },
  id: {
    type: Number,
    required:false
  }
})

</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.input {
  width: 100%;
  height: 100%;
  padding: $small;
  background-color: $secondary-color;
  border: 1px solid $dark-color;
  border-radius: $small-radius;
}



</style>
