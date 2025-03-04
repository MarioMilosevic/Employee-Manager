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
  const searchValue = ref<string>('')

  function resetOptions() {
    sortFilterOptions.value = { ...baseOptions }
  }

  function setSortFilterOptions(value: string, option: SortFilterOptions) {
    sortFilterOptions.value[option] = value
  }

  function setSearchValue(value: string) {
    searchValue.value = value
  }

  return {
    sortFilterOptions,
    setSortFilterOptions,
    resetOptions,
    searchValue,
    setSearchValue
  }
})
