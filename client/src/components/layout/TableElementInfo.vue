<template>
  <EmployeeComp v-if="'address' in props.element" :element="props.element" />
  <UserComp v-else :element="props.element" />
</template>

<script setup lang="ts">
import { EmployeeType, UserType } from 'src/utils/types'
import { PropType } from 'vue'
import EmployeeComp from 'src/features/home/EmployeeComp.vue'
import UserComp from 'src/features/dashboard/UserComp.vue'

const props = defineProps({
  element: {
    type: Object as PropType<EmployeeType | UserType>,
    required: true,
  },
})
// const emit = defineEmits(['edit-event', 'delete-event'])
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

/* .employee {
  background-color: $secondary-color;
  color: $dark-color;
} */
</style>
