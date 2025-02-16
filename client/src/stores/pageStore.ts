import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageStore = defineStore('pageStore', () => {
  const page = ref<number>(1)
  const itemsPerPage = ref<number>(8)
  const elementsCount = ref<number>(0)

  function setPage(value: number) {
    page.value = value
  }
  function setItemsPerPage(value: number) {
    itemsPerPage.value = value
  }
  function setElementsCount(value: number) {
    elementsCount.value = value
  }
  function resetStore() {
    page.value = 1;
    itemsPerPage.value = 8;
    elementsCount.value = 0
  }

  return {
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    elementsCount,
    setElementsCount,
    resetStore
  }
})