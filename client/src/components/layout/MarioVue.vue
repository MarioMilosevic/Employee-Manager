<template>
   <FormBlock>
      <template #label>
        <FormLabel id="sort" :border="false">
          <p>Sort by:</p>
        </FormLabel>
      </template>
      <template #input>
        <FormSelect
          id="sort"
          :border="false"
          :options="props.sortOptions"
          v-model="filterOptionsStore.sortFilterOptions.sort"
          @update:model-value="sortHandler"
        />
      </template>
    </FormBlock>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import FormBlock from 'src/components/form/FormBlock.vue';
import FormSelect from 'src/components/form/FormSelect.vue';
import FormLabel from 'src/components/form/FormLabel.vue';
import { useSortFilterStore } from 'src/stores/sortFIlterOptionsStore';
import { usePageStore } from 'src/stores/pageStore';
import { useRouter } from 'vue-router';

const filterOptionsStore = useSortFilterStore()
const pageStore = usePageStore()
const router = useRouter()
const props = defineProps({
    sortOptions: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const sortHandler = (target: string) => {
  const currentQuery = { ...router.currentRoute.value.query }
  router.push({
    query: { ...currentQuery, sort: target.toLowerCase() },
  })
  pageStore.setPageStore('page', 1)
  filterOptionsStore.setSortFilterOptions(target, 'sort')
}

</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/abstracts/_mixins' as mixins;
</style>