<template>
  <aside class="sidebar">
    <!-- <slot name="title"/> -->

    <template v-for="(array, index) in props.options" :key="index">
      <FilterComp
        v-if="Array.isArray(array)"
        :options="array.slice(1)"
      >
        <template #title>
          {{ array[0] }}
        </template>
      </FilterComp>
      <FilterComp
        v-else
        :options="[array]"
      >
        <template #title>
          {{[array][0]}}
        </template>
      </FilterComp>
    </template>
  </aside>
</template>


<script setup lang="ts">
import { PropType } from 'vue';
import FilterComp from 'src/components/layout/FilterComp.vue';


const props = defineProps({
  options: {
    type: Array as PropType<string[] | string[][]>,
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

.mario {
  border: 1px solid white;
}

</style>

<!-- <template>
  <aside class="sidebar">
    <slot name="title"/>
    <template v-for="array in props.options" :key="array">
      <FilterComp :options="array.slice(1)">
        <template #title>
          {{ array[0] }}
        </template>
      </FilterComp>
    </template>
</aside>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import FilterComp from 'src/components/layout/FilterComp.vue';


const props = defineProps({
  options: {
    type: Array as PropType<string[] | string[][]>,
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

.mario {
  border: 1px solid white;
}

</style> -->