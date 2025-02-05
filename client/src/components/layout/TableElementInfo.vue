<template>
  <tr class="table__row employee">

    <td>{{ employee.firstName }}</td>
    <td>{{ employee.lastName }}</td>
    <td>{{ employee.address }}</td>
    <td>{{ formatDate(employee.startYear) }}</td>
    <td>
      <FormCheckbox
        v-if="props.hasCheckbox"
        :disabled="true"
        :training-completed="employee.trainingCompleted"
      />
    </td>

    <BaseIcon size="big" stroke="#22c55e" @click="emit('edit-event')">
      <EditIcon />
    </BaseIcon>
  </tr>
</template>

<script setup lang="ts">
import { EmployeeType } from 'src/utils/types'
import { PropType } from 'vue'
import { formatDate } from 'src/utils/helpers'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import BaseIcon from 'src/icons/BaseIcon.vue'
import EditIcon from 'src/icons/EditIcon.vue'

const props = defineProps({
  employee: {
    type: Object as PropType<EmployeeType>,
    required: true,
  },
  hasCheckbox: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['edit-event', 'delete-event'])

</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.employee {
  background-color: $secondary-color;
  color: $dark-color;
}
</style>
