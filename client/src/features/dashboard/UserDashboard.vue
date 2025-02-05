<template>
 <TableElementEdit
    v-if="isEditing"
    :element="props.element"
    :inputs="inputs"
    :isMainPage="isMainPage"
    @close-event="isEditing = false"
    @delete-event="emit('delete-event', element.id)"
    @edit-event="editHandler"
  />
  <TableElementInfo
    v-else
    :element="element"
    :isMainPage="isMainPage"
    @edit-event="isEditing = true"
  />
</template>

<script setup lang="ts">
import TableElementInfo from 'src/components/layout/TableElementInfo.vue'
import TableElementEdit from 'src/components/layout/TableElementEdit.vue'
import { EmployeeType, InputType, UserType } from 'src/utils/types'
import { PropType, ref } from 'vue'
// import EmployeeHome from 'src/features/home/EmployeeHome.vue'
// import UserDashboard from 'src/features/dashboard/UserDashboard.vue'

const isEditing = ref<boolean>(false)

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
  isEditing.value = false
}
</script>
