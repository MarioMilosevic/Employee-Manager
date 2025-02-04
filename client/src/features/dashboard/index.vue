<template>
  Dashboard
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getData } from 'src/api/api';
import { UserType } from 'src/utils/types';

const users = ref<UserType>([])

onBeforeMount(async () => {
  console.log('radi')
  try {
    const response = await getData('users/all')
    console.log(response)
    users.value = response.data
  } catch (error) {
    console.error(error)
  }
})

</script>

<style scoped>

</style>