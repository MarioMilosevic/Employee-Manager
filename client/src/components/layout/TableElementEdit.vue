<template>
  <tr class="table__row" :style="{ position: 'relative' }">
    <FormBlock v-for="input in props.inputs" :key="input.id">
      <template #input>
        <FormInput
          align="center"
          v-bind="input"
          v-model="selectedEmployee[input.name as keyof typeof selectedEmployee] as string"
        />
      </template>
    </FormBlock>
    <FormCheckbox
      v-if="hasCheckbox"
      :trainingCompleted="selectedEmployee.trainingCompleted"
      @checkbox-event="toggleTrainingCompleted"
    />
    <td class="actions">
      <BaseIcon size="big" stroke="#22c55e" @click="emit('edit-event', selectedEmployee)">
        <ConfirmIcon />
      </BaseIcon>
      <BaseIcon size="big" stroke="#ef4444" @click="emit('delete-event')">
        <DeleteIcon />
      </BaseIcon>
      <BaseIcon size="big" @click="emit('close-event', props.employee.id)">
        <CloseIcon />
      </BaseIcon>
    </td>
  </tr>
</template>

<script setup lang="ts">
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import CloseIcon from 'src/icons/CloseIcon.vue'
import BaseIcon from 'src/icons/BaseIcon.vue'
import DeleteIcon from 'src/icons/DeleteIcon.vue'
import ConfirmIcon from 'src/icons/ConfirmIcon.vue'
import { EmployeeType, InputType } from 'src/utils/types'
import { PropType, ref } from 'vue'

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
    required:true
  },
})

const selectedEmployee = ref<EmployeeType>({ ...props.employee })
const emit = defineEmits(['edit-event', 'delete-event', 'close-event'])

const toggleTrainingCompleted = (value: boolean) => {
  selectedEmployee.value.trainingCompleted = value
}
</script>

<style scoped lang="scss">
.close {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
