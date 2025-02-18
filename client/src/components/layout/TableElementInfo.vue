<template>
  <EmployeeComp v-if="'address' in props.element" :element="props.element" />
  <UserComp v-else :element="props.element" @delete-event="emits('delete-event')"/>
</template>

<script setup lang="ts">
import { ElementType } from 'src/utils/types'
import { PropType } from 'vue'
import EmployeeComp from 'src/features/home/EmployeeComp.vue'
import UserComp from 'src/features/dashboard/UserComp.vue'

const emits = defineEmits(['delete-event'])

const props = defineProps({
  element: {
    type: Object as PropType<ElementType>,
    required: true,
  },
})
</script>