<template>
  <form class="form">
    <slot name="title" />
    <slot v-for="input in props.inputs" :key="input.id" :name="input.name" />
    <slot/>
    <slot name="submit" />
    <slot name="text" />
  </form>
</template>

<script setup lang="ts">
import { PropType, useSlots } from 'vue'
import { InputType } from 'src/utils/types'

const slots = useSlots()
console.log(slots)

const props = defineProps({
  inputs: {
    type: Array as PropType<InputType[]>,
  },
})
</script>