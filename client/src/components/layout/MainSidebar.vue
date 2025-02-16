<template>
  <aside class="sidebar">
    <template v-for="array in props.options" :key="array[0]">
      <FilterComp :options="array.slice(1)" :category="array[0]">
        <template #title>
          {{ array[0] }}
        </template>
      </FilterComp>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import FilterComp from 'src/components/layout/FilterComp.vue'

const props = defineProps({
  options: {
    type: Array as PropType<string[][]>,
    required: true,
  },
})

</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/abstracts/_mixins' as mixins;


.sidebar {
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: $medium;


 @include mixins.respond(small) {
  position: fixed;
  left: 0%;
  top: 30%;
}

}
</style>
