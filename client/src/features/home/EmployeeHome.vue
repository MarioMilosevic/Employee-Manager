<template>
   <TableElementEdit
    v-if="isEditing"
    :element="props.element"
    :inputs="inputs"
    @close-event="isEditing = false"
    @delete-event="emit('delete-event', element.id)"
    @edit-event="editHandler"
  />
  <TableElementInfo
    v-else
    :element="element"
    @edit-event="isEditing = true"
  />
</template>

<script setup lang="ts">
import TableElementInfo from 'src/components/layout/TableElementInfo.vue'
import TableElementEdit from 'src/components/layout/TableElementEdit.vue'
import { EmployeeType, InputType, ElementType } from 'src/utils/types'
import { PropType, ref } from 'vue'

const isEditing = ref<boolean>(false)

const props = defineProps({
  element: {
    type: Object as PropType<EmployeeType>,
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
  isEditing.value = false
}
</script>
