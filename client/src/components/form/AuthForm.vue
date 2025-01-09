<template>
  <form class="form">
    <slot name="title"/>
    <slot name="firstName" />
    <slot name="lastName" />
    <slot name="email" />
    <slot name="password" />
    <slot name="confirmPassword" />
    <slot name="submit"/>
  </form>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.form {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: $medium;
  background-color: $primary-shade-color;
  background-color: $secondary-color;
  padding: $big $very-big;
  width: 400px;
  margin: 0 auto;
  border-radius: $medium-radius;
}
</style>
