<template>
  <table class="table">
    <tr class="table__row">
      <th>Full Name</th>
      <th>Address</th>
      <th>Date started</th>
      <th>Completed Training</th>
      <th>Actions</th>
    </tr>
    <slot name="employees"/>
  </table>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
 @use 'src/scss/abstracts/_variables' as *;


.table {
  border: 1px solid black;
  display: flex;
  flex-direction: column;

  &__heading {
    margin-bottom: $medium;
  };

   & > button {
    align-self: flex-start;
    margin-bottom: $medium;
  }
}

</style>
