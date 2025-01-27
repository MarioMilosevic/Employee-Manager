<template>
  <tr class="table__row" :style="{position:'relative'}">
    <FormBlock v-for="input in props.inputs" :key="input.id">
      <template #input>
        <FormInput
          v-bind="input"
          v-model="selectedEmployee[input.name as keyof typeof selectedEmployee]"
        />
      </template>
    </FormBlock>
    <FormCheckbox :id="selectedEmployee.id" :trainingCompleted="selectedEmployee.trainingCompleted" />
    <div class="actions">
      <BaseIcon size="big" stroke="#22c55e">
        <ConfirmIcon />
      </BaseIcon>
      <BaseIcon size="big" stroke="#ef4444" @click="emit('delete-event')">
        <DeleteIcon />
      </BaseIcon>
      <BaseIcon size="big" @click="emit('close-event', props.employee.id)">
        <CloseIcon/>
      </BaseIcon>
    </div>
  </tr>
</template>

<script setup lang="ts">
import FormBlock from 'src/components/form/FormBlock.vue'
import FormError from 'src/components/form/FormError.vue'
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
})

const selectedEmployee = ref<EmployeeType>({ ...props.employee })

const emit = defineEmits(['edit-event', 'delete-event', 'close-event'])

</script>

<style scoped lang="scss">
.close {
  position: absolute;
  top: 0px;
  right: 0px;
}
/* @use 'src/scss/abstracts/variables' as *; */

/* .actions {
  border: 1px solid black;
  display: flex;
  gap: $small;
} */
</style>
