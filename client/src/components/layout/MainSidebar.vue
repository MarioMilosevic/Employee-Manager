<template>
  <aside class="sidebar">
    <slot name="title"/>
    <RenderlessComp>
        <template v-for="option in props.options" :key="option" #[option]>
          {{ option }}
        </template>
    </RenderlessComp>
</aside>
</template>

<script setup lang="ts">
import RenderlessComp from 'src/components/layout/RenderlessComp.vue';
import { PropType } from 'vue';
const slots = defineSlots()
console.log(slots)

const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    required:true
  }
})

</script>

<style scoped lang="scss">

@use 'src/scss/abstracts/_variables' as *;
.sidebar {
  grid-column: 1 / 3;
  background-color: red;
  display: flex;
  flex-direction: column;
  padding: $medium;
}

</style>