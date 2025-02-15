<template>
  <nav class="pagination">
    <p>Showing 1 to 8 out of 32</p>
    <div class="pagination__icons">
      <BaseIcon>
        <ChevronLeft/>
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
