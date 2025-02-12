import { defineStore } from 'pinia'
import { ref } from 'vue'

type Options = 'sort' | 'departmentFilter' | 'employmentFilter' | 'roleFilter'

export const useSortFilterStore = defineStore('sortFilterStore', () => {
  const sortFilterOptions = ref({
    sort: 'Name: A-Z',
    departmentFilter: 'All',
    employmentFilter: 'All',
    roleFilter: 'All',
  })

  function setSortFilterOptions(value: string, option: Options) {
    sortFilterOptions.value[option] = value
  }

  return {
    sortFilterOptions,
    setSortFilterOptions,
  }
})
