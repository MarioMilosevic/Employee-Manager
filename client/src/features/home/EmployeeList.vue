<template>
  <table class="table">
    <h2 class="table__heading">Employee List</h2>
    <ActionButton>Add New Employee</ActionButton>
    <tr class="table__row">
      <th>Name</th>
      <th>Address</th>
      <th>Date started</th>
      <th>Completed Training</th>
      <th>Actions</th>
    </tr>
    <slot name="employees"/>
  </table>
</template>

<script setup lang="ts">
import ActionButton from 'src/components/layout/ActionButton.vue';
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


  /* &__row{
    border: 1px solid white;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    text-align: justify;
  } */
}

</style>
