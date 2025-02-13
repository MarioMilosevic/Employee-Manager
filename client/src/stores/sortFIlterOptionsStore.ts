import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SortFilterOptions } from 'src/utils/types'


export const useSortFilterStore = defineStore('sortFilterStore', () => {
  const sortFilterOptions = ref({
    sort: 'Name: A-Z',
    department: 'All',
    employment: 'All',
    role: 'All',
  })

  function setSortFilterOptions(value: string, option: SortFilterOptions) {
    console.log(option)
    sortFilterOptions.value[option] = value
  }

  return {
    sortFilterOptions,
    setSortFilterOptions,
  }
})
