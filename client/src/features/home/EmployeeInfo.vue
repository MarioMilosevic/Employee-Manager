<template>
  <tr class="table__row employee">
    <td>{{ fullName }}</td>
    <td>{{ employee.address }}</td>
    <td>{{ formatDate(employee.startYear) }}</td>
    <td>
      <FormCheckbox
        :disabled="true"
        :training-completed="employee.trainingCompleted"
        @checkbox-event="mario"
      />
    </td>
    <td class="employee__actions">
      <BaseIcon size="big" stroke="#22c55e" @click="emit('edit-event')"
        ><EditIcon
      /></BaseIcon>
      <BaseIcon size="big" stroke="#ef4444" @click="emit('delete-event')"><DeleteIcon /></BaseIcon>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { EmployeeType } from 'src/utils/types'
import { PropType, computed } from 'vue'
import { formatDate } from 'src/utils/helpers'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import BaseIcon from 'src/icons/BaseIcon.vue'
import EditIcon from 'src/icons/EditIcon.vue'
import DeleteIcon from 'src/icons/DeleteIcon.vue'

const props = defineProps({
  employee: {
    type: Object as PropType<EmployeeType>,
    required: true,
  },
})
const emit = defineEmits(['edit-event', 'delete-event'])

const fullName = computed(() => {
  return `${props.employee.firstName} ${props.employee.lastName}`
})

const mario = (value:number) => {
  console.log(value, props.employee.id)
}

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
