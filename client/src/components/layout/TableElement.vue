<template>
  <TableElementEdit
    v-if="isEditing"
    :employee="props.employee"
    :inputs="props.inputs"
    :has-checkbox="props.hasCheckbox"
    @close-event="isEditing = false"
    @delete-event="emit('delete-event', props.employee.id)"
    @edit-event="editHandler"
  />
  <TableElementInfo
    v-else
    :employee="props.employee"
    :has-checkbox="props.hasCheckbox"
    @edit-event="isEditing = true"
  >
  <template>
    <!-- da ide loop ako je type date da ide formatDate a ako je type checkbox da ide CHeckbox -->

  </template>
  </TableElementInfo>
</template>

<script setup lang="ts">
import TableElementInfo from 'src/components/layout/TableElementInfo.vue'
import TableElementEdit from 'src/components/layout/TableElementEdit.vue'
import { EmployeeType, InputType } from 'src/utils/types'
import { PropType, ref } from 'vue'

const isEditing = ref<boolean>(false)

const props = defineProps({
  employee: {
    type: Object as PropType<EmployeeType>,
    required: true,
  },
  inputs: {
    type: Array as PropType<InputType[]>,
    required: true,
  },
  hasCheckbox: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['edit-event', 'delete-event'])

const editHandler = (employee: EmployeeType) => {
  emit('edit-event', employee)
  isEditing.value = false
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.employee {
  background-color: $secondary-color;
  color: $dark-color;
  &__actions {
    display: flex;
    gap: $medium;
    align-items: center;
  }
}
</style>
