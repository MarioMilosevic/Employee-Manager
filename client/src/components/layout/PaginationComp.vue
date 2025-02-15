<template>
  <nav class="pagination">
    <p>Showing 1 to 8 out of 32</p>
    <div class="pagination__icons">
      <BaseIcon>
        <ChevronLeft />
      </BaseIcon>
      <BaseIcon>
        <ChevronRight />
      </BaseIcon>
    </div>
  </nav>
</template>

<script setup lang="ts">
import BaseIcon from 'src/icons/BaseIcon.vue'
import ChevronRight from 'src/icons/ChevronRight.vue'
import ChevronLeft from 'src/icons/ChevronLeft.vue'
import { usePageStore } from 'src/stores/pageStore'

const pageStore = usePageStore()
// const showResultsFrom = (pageNumber: number - 1, itemsPerPage: number) => {
//   console.log("broj strane",pageNumber)
//   console.log("koliko ih ima po stranici",itemsPerPage)
//   return ((pageNumber - 1) * (itemsPerPage + 1))
// }
const showResultsFrom = (pageStore.page - 1) * pageStore.itemsPerPage + 1
console.log(showResultsFrom)
let showResultsTo = showResultsFrom + pageStore.itemsPerPage  - 1
console.log(showResultsTo)
//  const showResultsFrom = (currentPage - 1) * itemsPerPage + 1; // 1 , 11 ,21, 31...
//   let showResultsTo = showResultsFrom + itemsPerPage - 1; // 10,20,30,40...
//   if (showResultsTo > numberOfRooms) {
//     showResultsTo = numberOfRooms;
//   }
// const showResultsFrom =
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.pagination {
  margin-top: $medium;
  background-color: $primary-dark-color;
  grid-column: 7/9;
  padding: $small $medium;
  border-radius: $small-radius;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__icons {
    display: flex;
    align-items: center;
    gap: $small;
  }
}
</style>
