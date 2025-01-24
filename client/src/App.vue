<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<!--
1) da napravim da AuthForm pravi slot za prop elemenata
2) ubacim toast
4) dodam za guest log in u prisma model role:admin, employee, guestUser tako
3) computed umjesto watch
3) da erorr iz servera ide u catch
da napravim guest sign in
da promjenim malo UI da imam checkbox
dugme add new employee
da kada editujem employee na licu mjesta mogu, znaci input polja da budu umjesto ovog sto je napisano
da na serveru ubacim ove podatke za slotove, znaci fecam



-->