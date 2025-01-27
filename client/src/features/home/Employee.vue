<template>
  <EmployeeEdit
    v-if="isEditing"
    :employee="props.employee"
    :inputs="props.inputs"
    @close-event="isEditing = false"
    @delete-event="emit('delete-event', props.employee.id)"
  />
  <EmployeeInfo v-else :employee="props.employee" @edit-event="isEditing = true" />
</template>

<script setup lang="ts">
import { EmployeeType, InputType } from 'src/utils/types'
import { PropType, ref } from 'vue'
import EmployeeInfo from 'src/features/home/EmployeeInfo.vue'
import EmployeeEdit from 'src/features/home/EmployeeEdit.vue'
import { deleteData } from 'src/api/api'

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
})
const emit = defineEmits(['edit-event', 'delete-event'])

// emit('edit-event', props.employee.id)
// const deleteHandler = () => {
//   emit('delete-event', props.employee.id)
// }
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
