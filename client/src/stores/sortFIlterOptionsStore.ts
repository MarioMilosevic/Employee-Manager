import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSortFilterStore = defineStore('sortFilterStore', () => {
  const sortFilterOptions = ref({
    sort: 'Name: A-Z',
    filter: 'All',
  })

  function setSortFilterOptions(value: string, option: 'sort' | 'filter') {
    sortFilterOptions.value[option] = value
  }

  return {
    sortFilterOptions,
    setSortFilterOptions,
  }
})
