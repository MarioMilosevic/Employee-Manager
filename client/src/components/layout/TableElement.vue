<template>
  <EmployeeHome
    v-if="'startYear' in props.element"
    :element="(element as EmployeeType)"
    :inputs="inputs"
    @edit-event="editHandler"
    @delete-event="emit('delete-event')"
  />
  <UserDashboard
    v-else
    :element="(element as UserType)"
    :inputs="inputs"
    @delete-event="emit('delete-event')"
    />
  </template>

<script setup lang="ts">
import { EmployeeType, InputType, UserType, ElementType } from 'src/utils/types'
import { PropType } from 'vue'
import EmployeeHome from 'src/features/home/EmployeeHome.vue'
import UserDashboard from 'src/features/dashboard/UserDashboard.vue'

const props = defineProps({
  element: {
    type: Object as PropType<ElementType>,
    required: true,
  },
  inputs: {
    type: Array as PropType<InputType[]>,
    required: true,
  },
})

const emit = defineEmits(['edit-event', 'delete-event'])

const editHandler = (element: ElementType) => {
  emit('edit-event', element)
}
</script>
