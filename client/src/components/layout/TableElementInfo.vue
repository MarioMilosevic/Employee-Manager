<template>
  <tr class="table__row employee">
    <!-- <slot name="firstName"/>
    <slot name="lastName"/>
    <slot name="address"/>
    <slot name="dateStarted"/>
    <slot name="checkbox"/>
    <slot name="role"/>
    <slot name="email"/>
    <slot name="actions"/> -->
    <td>{{ element.firstName }}</td>
    <td>{{ element.lastName }}</td>
    <td>{{ element.address }}</td>
    <td>{{ formatDate(element.startYear) }}</td>
    <td :v-if="isMainPage">
      <FormCheckbox
        :disabled="true"
        :training-completed="element.trainingCompleted"
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
  element: {
    type: Object as PropType<EmployeeType>,
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
