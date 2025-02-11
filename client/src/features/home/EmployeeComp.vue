<template>
  <tr class="table__row employee">
    <td>{{ props.element.fullName }}</td>
    <td>{{ props.element.address }}</td>
    <td>{{ formatDate(props.element.startYear) }}</td>
    <td>{{ props.element.employmentStatus }}</td>
    <td>{{ props.element.department }}</td>
    <FormCheckbox :disabled="true" :training-completed="props.element.trainingCompleted" />
    <ActionsRow @click="emit('edit-event')" />
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

console.log(props.element)

const emit = defineEmits(['edit-event', 'delete-event'])
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.employee {
  background-color: $secondary-color;
  color: $dark-color;
}
</style>
