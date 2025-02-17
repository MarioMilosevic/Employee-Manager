<template>
  <nav class="nav">
    <div class="nav__left">
      <BaseIcon class="nav__left-icon" size="big" @click="emits('navigation-event')">
        <HamburgerIcon />
      </BaseIcon>
      <h3 class="nav__left-title">
        Found {{ pageStore.elementsCount }} {{ elementName }} in total
      </h3>
    </div>
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
import FormBlock from 'src/components/form/FormBlock.vue'
import FormLabel from 'src/components/form/FormLabel.vue'
import FormSelect from 'src/components/form/FormSelect.vue'
import BaseIcon from 'src/icons/BaseIcon.vue'
import HamburgerIcon from 'src/icons/HamburgerIcon.vue'
import { ElementType } from 'src/utils/types'
import { PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSortFilterStore } from 'src/stores/sortFIlterOptionsStore'
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

const emits = defineEmits(['navigation-event'])

const router = useRouter()
const pageStore = usePageStore()

const sortHandler = (target: string) => {
  const currentQuery = { ...router.currentRoute.value.query }
  router.push({
    query: { ...currentQuery, sort: target.toLowerCase() },
  })
  pageStore.setPage(1)
  filterOptionsStore.setSortFilterOptions(target, 'sort')
}

const elementName = computed(() => {
  return props.page === 'home' ? 'employees' : 'users'
})
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/abstracts/_mixins' as mixins;

.nav {
  grid-column: 1 / 9;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__left {
    @include mixins.respond(small) {
      display: flex;
      align-items: center;
      gap: $small;
    }

    &-title {
      @include mixins.respond(small) {
        font-size: $medium;
      }
    }

    &-icon {
      display: none;

      @include mixins.respond(small) {
        display: block;
      }
    }
  }
}
</style>
