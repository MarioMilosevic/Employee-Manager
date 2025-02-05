<template>
  <EmployeeHome
    v-if="props.isMainPage"
    :element="element"
    :inputs="inputs"
    :isMainPage="props.isMainPage"
    @edit-event="editHandler"
    @delete-event="emit('delete-event', props.element.id)"
  />
  <UserDashboard v-else :element="element" :inputs="inputs" :isMainPage="props.isMainPage"/>
</template>

<script setup lang="ts">
import { EmployeeType, InputType, UserType } from 'src/utils/types'
import { PropType } from 'vue'
import EmployeeHome from 'src/features/home/EmployeeHome.vue'
import UserDashboard from 'src/features/dashboard/UserDashboard.vue'

const props = defineProps({
  element: {
    type: Object as PropType<EmployeeType | UserType>,
    required: true,
  },
  inputs: {
    type: Array as PropType<InputType[]>,
    required: true,
  },
  isMainPage: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['edit-event', 'delete-event'])

const editHandler = (element: EmployeeType | UserType) => {
  emit('edit-event', element)
  // isEditing.value = false
}
</script>
