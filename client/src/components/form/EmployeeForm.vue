<template>
  <form class="form">
    <slot name="firstName"/>
    <slot name="lastName"/>
    <slot name="year"/>
    <slot name="startYear"/>
    <slot name="address"/>
    <slot name="trainingCompleted"/>
  </form>
</template>

<script lang="ts">
  export default {

  }
</script>

<style lang="scss" scoped>
.form {

}

</style>
