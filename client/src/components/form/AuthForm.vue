<template>
  <form class="form">
    <slot name="title" />
    <!-- <slot v-for="key in Object.keys(slots)" :key="key" :name="key" /> -->
    <slot v-for="input in props.inputs" :key="input.id" :name="input.name" />
     <slot/>
     <slot name="submit" />
     <slot name="text" />
  </form>
</template>

<script setup lang="ts">
import { PropType,  } from 'vue'
import { InputType } from 'src/utils/types'

// const slots = defineSlots()
// console.log(slots)


const props = defineProps({
  inputs: {
    type: Array as PropType<InputType[]>,
  },
})
</script>