import { defineStore } from 'pinia'
import { ref } from 'vue'

type PageStoreType = {
  page: number
  itemsPerPage: number
  elementsCount: number
}

const basePageStore = {
  page: 1,
  itemsPerPage: 8,
  elementsCount: 0,
}

export const usePageStore = defineStore('pageStore', () => {
  const pageStore = ref<PageStoreType>({ ...basePageStore })

  function setPageStore(key: keyof PageStoreType, value: number) {
    pageStore.value[key] = value
  }

  function resetStore() {
    pageStore.value = { ...basePageStore }
  }

  return {
    pageStore,
    setPageStore,
    resetStore,
  }
})
