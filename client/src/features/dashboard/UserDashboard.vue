<template>
 <TableElementEdit
    v-if="isEditing"
    class="dashboard"
    :element="props.element"
    :inputs="inputs"
    @close-event="isEditing = false"
    @delete-event="emit('delete-event', element.id)"
    @edit-event="editHandler"
  />
  <TableElementInfo
    v-else
    class="dashboard"
    :element="element"
    @edit-event="isEditing = true"
  />
</template>

<script setup lang="ts">
import TableElementInfo from 'src/components/layout/TableElementInfo.vue'
import TableElementEdit from 'src/components/layout/TableElementEdit.vue'
import {  InputType, UserType } from 'src/utils/types'
import { PropType, ref } from 'vue'

const isEditing = ref<boolean>(false)

const props = defineProps({
  element: {
    type: Object as PropType<UserType>,
    required: true,
  },
  inputs: {
    type: Array as PropType<InputType[]>,
    required: true,
  },
})


const emit = defineEmits(['edit-event', 'delete-event'])

const editHandler = (element: UserType) => {
  emit('edit-event', element)
  isEditing.value = false
}
</script>
