import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SortFilterOptions } from 'src/utils/types'

const baseOptions = {
  sort: 'Name: A-Z',
  department: 'All',
  employment: 'All',
  role: 'All',
}

export const useSortFilterStore = defineStore('sortFilterStore', () => {
  const sortFilterOptions = ref({ ...baseOptions })

  function resetOptions() {
    Object.assign(sortFilterOptions.value, baseOptions)
    // sortFilterOptions.value = { ...baseOptions }
  }

  function setSortFilterOptions(value: string, option: SortFilterOptions) {
    sortFilterOptions.value[option] = value
  }

  return {
    sortFilterOptions,
    setSortFilterOptions,
    resetOptions,
  }
})
