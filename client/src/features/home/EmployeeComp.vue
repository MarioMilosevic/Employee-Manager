<template>
  <tr class="table__row">
    <td data-cell="Full Name">{{ props.element.fullName }}</td>
    <td data-cell="Address">{{ props.element.address }}</td>
    <td data-cell="Start Date">{{ formatDate(props.element.startYear as Date) }}</td>
    <td data-cell="Employment">{{ props.element.employment }}</td>
    <td data-cell="Department">{{ props.element.department }}</td>
    <td data-cell="Training">
      <FormCheckbox :disabled="true" :training-completed="props.element.trainingCompleted" />
    </td>
    <ActionsRow class="smallActions" @click="emit('edit-event')" />
  </tr>
</template>

<script setup lang="ts">
import { EmployeeType } from 'src/utils/types'
import { PropType } from 'vue'
import ActionsRow from 'src/components/layout/ActionsRow.vue'
import { formatDate } from 'src/utils/helpers'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'

const props = defineProps({
  element: {
    type: Object as PropType<EmployeeType>,
    required: true,
  },
})

const emit = defineEmits(['edit-event', 'delete-event'])
</script>