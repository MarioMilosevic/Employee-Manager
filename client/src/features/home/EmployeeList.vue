<template>
  <table class="table">
    <thead class="table__row">
      <tr>
        <th>First Name</th>
      </tr>
      <tr>
        <th>Last Name</th>
      </tr>
      <tr>
        <th>Address</th>
      </tr>
      <tr>
        <th>Date started</th>
      </tr>
      <tr>
        <th>Training</th>
      </tr>
      <tr>
        <th>Actions</th>
      </tr>
    </thead>
    <slot name="employees" />
  </table>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.table {
  display: flex;
  flex-direction: column;

  &__heading {
    margin-bottom: $medium;
  }
}
</style>
