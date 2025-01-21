<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<!--
1) da napravim da AuthForm pravi slot za prop elemenata
2) ubacim toast
3) computed umjesto watch
3) da erorr iz servera ide u catch (tako nesto)
4) dodam za guest log in u prisma model role:admin, employee, guestUser tako
-->