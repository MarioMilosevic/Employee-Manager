<template>
  <table class="table">
    <thead class="table__row">
      <slot name="headings" />
    </thead>
    <slot name="elements" />
  </table>
</template>


<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.table {
  display: flex;
  flex-direction: column;
}
</style>
