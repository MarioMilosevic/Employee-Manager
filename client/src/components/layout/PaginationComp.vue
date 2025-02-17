<template>
  <nav class="pagination">
    <ElementsPerPageController />
    <PagesController
      @next-page-event="nextPageHandler"
      @previous-page-event="previousPageHandler"
    />
  </nav>
</template>

<script setup lang="ts">
import PagesController from 'src/components/layout/PagesController.vue'
import ElementsPerPageController from 'src/components/layout//ElementsPerPageController.vue'

const emits = defineEmits(['next-page-event', 'previous-page-event'])

const nextPageHandler = () => {
  emits('next-page-event')
}

const previousPageHandler = () => {
  emits('previous-page-event')
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/abstracts/_mixins' as mixins;

.pagination {
  margin-top: $medium;
  background-color: $primary-dark-color;
  grid-column: 2/9;
  padding: $small $medium;
  border-radius: $small-radius;
  display: flex;
  align-items: center;
  justify-content: space-between;

@include mixins.respond(small) {
  grid-column: 1/9;
}

}
</style>
