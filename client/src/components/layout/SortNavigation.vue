<template>
  <nav class="nav">
    <h3>{{ pageStore.elementsCount }} {{ elementName }} found in total</h3>
    <FormBlock>
      <template #label>
        <FormLabel id="sort">
          <p>Sort by:</p>
        </FormLabel>
      </template>
      <template #input>
        <FormSelect
          id="sort"
          :options="props.sortOptions"
          v-model="filterOptionsStore.sortFilterOptions.sort"
          @update:model-value="sortHandler"
        />
      </template>
    </FormBlock>
  </nav>
</template>

<script setup lang="ts">
import { ElementType } from 'src/utils/types'
import { PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSortFilterStore } from 'src/stores/sortFIlterOptionsStore'
import FormBlock from 'src/components/form/FormBlock.vue'
import FormLabel from 'src/components/form/FormLabel.vue'
import FormSelect from 'src/components/form/FormSelect.vue'
import { usePageStore } from 'src/stores/pageStore'

const filterOptionsStore = useSortFilterStore()

const props = defineProps({
  elements: {
    type: Array as PropType<ElementType[]>,
    required: true,
  },
  page: {
    type: String as PropType<'home' | 'dashboard'>,
    required: true,
  },
  sortOptions: {
    type: Array as PropType<string[]>,
    required: true,
  },
})
const router = useRouter()
const pageStore = usePageStore()

const sortHandler = (target: string) => {
  const currentQuery = { ...router.currentRoute.value.query }
  router.push({
    path: router.currentRoute.value.path,
    query: { ...currentQuery, sort: target },
  })
  filterOptionsStore.setSortFilterOptions(target, 'sort')
}

const elementName = computed(() => {
  return props.page === 'home' ? 'employees' : 'users'
})
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.nav {
  grid-column: 1 / 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
