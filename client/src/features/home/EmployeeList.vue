<template>
  <table class="table">
    <h2>Employee List</h2>
    <ActionButton>Add New Employee</ActionButton>
    <tr class="table__row">
      <th class="table__row-heading">Name</th>
      <th class="table__row-heading">Email</th>
      <th class="table__row-heading">Date started</th>
      <th class="table__row-heading">Completed Training</th>
      <th class="table__row-heading">Actions</th>
    </tr>
  </table>
</template>

<script setup lang="ts">
import ActionButton from 'src/components/layout/ActionButton.vue';
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.table {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: $medium;

   & > button {
    align-self: flex-start; // Ensures the button doesn't stretch across the parent
  }


  &__row{
    border: 1px solid white;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    text-align: justify;
  }
}

</style>
