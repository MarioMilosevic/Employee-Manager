<template>
  <section class="section">
    <h3 class="section__title">
      <slot name="title" />
    </h3>
    <RenderlessComp>
      <template v-for="(option, index) in props.options" :key="option" #[option]>
        <ActionButton
          :color="index === selectedIndex ? 'purple' : 'white'"
          @click="filterHandler(option, index)"
        >
          {{ option }}
        </ActionButton>
      </template>
    </RenderlessComp>
  </section>
</template>

<script setup lang="ts">
import RenderlessComp from 'src/components/layout/RenderlessComp.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { useSortFilterStore } from 'src/stores/sortFIlterOptionsStore'
import { computed, PropType, ref } from 'vue'
import { useRouter } from 'vue-router'
import { SortFilterOptions } from 'src/utils/types'
import { usePageStore } from 'src/stores/pageStore'

const sortFilterOptions = useSortFilterStore()
const pageStore = usePageStore()
const selectedIndex = ref<number>(0)
const router = useRouter()

const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
})

const filter = computed(() => {
  return `${props.category.toLowerCase()}`
})

const filterHandler = (option: string, index: number) => {
  pageStore.setPage(1)
  const currentQuery = { ...router.currentRoute.value.query }
  router.push({
    query: { ...currentQuery, [filter.value]: option },
  })
  sortFilterOptions.setSortFilterOptions(option, filter.value as SortFilterOptions)
  selectedIndex.value = index
}
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;
.section {
  grid-column: 1 / 3;
  display: grid;
  background-color: $primary-dark-color;
  padding: $medium;
  grid-template-columns: repeat(2, 1fr);
  gap: $medium;
  border-radius: $medium-radius;

  &__title {
    grid-column: 1/3;
  }
}
</style>
