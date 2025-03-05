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
  const pageObj = ref<PageStoreType>({ ...basePageStore })

  function setPageStore(key: keyof PageStoreType, value: number) {
    pageObj.value[key] = value
  }

  function resetStore() {
    pageObj.value = { ...basePageStore }
  }

  return {
    pageObj,
    setPageStore,
    resetStore,
  }
})
