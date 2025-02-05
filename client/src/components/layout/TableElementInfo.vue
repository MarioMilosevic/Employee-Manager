<template>
  <tr class="table__row employee">
    <td>{{ element.firstName }}</td>
    <td>{{ element.lastName }}</td>
    <td>{{ element.address }}</td>
    <td v-if="isMainPage">{{ formatDate(element.startYear) }}</td>
    <td v-if="isMainPage">
      <FormCheckbox
        :disabled="true"
        :training-completed="element.trainingCompleted"
      />
    </td>
    <td v-if="!isMainPage">{{ element.role }}</td>
    <td v-if="!isMainPage">{{ element.email }}</td>

    <BaseIcon size="big" stroke="#22c55e" @click="emit('edit-event')">
      <EditIcon />
    </BaseIcon>
  </tr>
</template>

<script setup lang="ts">
import { EmployeeType, UserType } from 'src/utils/types'
import { PropType } from 'vue'
import { formatDate } from 'src/utils/helpers'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import BaseIcon from 'src/icons/BaseIcon.vue'
import EditIcon from 'src/icons/EditIcon.vue'

const props = defineProps({
  element: {
    type: Object as PropType<EmployeeType | UserType>,
    required: true,
  },
  isMainPage: {
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
