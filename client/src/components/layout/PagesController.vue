<template>
  <div class="wrapper">
    <p v-if="pageStore.pageObj.elementsCount > 0">
      Showing {{ showResultsFrom }} to {{ showResultsTo }} out of
      {{ pageStore.pageObj.elementsCount }}
    </p>
    <p v-else>No results found</p>
    <div class="wrapper__icons">
      <BaseIcon @click="emits('previous-page-event')" :is-disabled="pageStore.pageObj.page === 1">
        <ChevronLeft />
      </BaseIcon>

      <BaseIcon
        @click="emits('next-page-event')"
        :is-disabled="
          pageStore.pageObj.page >=
          pageStore.pageObj.elementsCount / pageStore.pageObj.itemsPerPage
        "
      >
        <ChevronRight />
      </BaseIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from 'src/icons/BaseIcon.vue'
import ChevronRight from 'src/icons/ChevronRight.vue'
import ChevronLeft from 'src/icons/ChevronLeft.vue'
import { usePageStore } from 'src/stores/pageStore'
import { computed } from 'vue'

const emits = defineEmits(['next-page-event', 'previous-page-event'])

const pageStore = usePageStore()
const showResultsFrom = computed(() => {
  return (pageStore.pageObj.page - 1) * pageStore.pageObj.itemsPerPage + 1
})

const showResultsTo = computed(() => {
  const to = showResultsFrom.value + pageStore.pageObj.itemsPerPage - 1
  return to > pageStore.pageObj.elementsCount ? pageStore.pageObj.elementsCount : to
})
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.wrapper {
  display: flex;
  align-items: center;
  gap: $small;

  &__icons {
    display: flex;
    align-items: center;
    gap: $small;
  }
}
</style>
