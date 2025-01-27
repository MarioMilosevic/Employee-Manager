<template>
  <tr>
    <td class="table__row">
      <FormBlock v-for="input in props.inputs" :key="input.id">
        <template #input>
          <FormInput
            v-bind="input"
            v-model="selectedEmployee[input.name as keyof typeof selectedEmployee]"
          />
        </template>
      </FormBlock>
      <FormCheckbox :id="selectedEmployee.id" :checked="selectedEmployee.trainingCompleted" />
      <span class="mario">
        <ActionButton size="small">Save</ActionButton>
        <ActionButton size="small">Delete</ActionButton>
      </span>
      <!-- <BaseIcon size="big" stroke="#ef4444" @click="emit('delete-event')">
        <DeleteIcon />
      </BaseIcon> -->
    </td>
  </tr>
</template>

<script setup lang="ts">
import FormBlock from 'src/components/form/FormBlock.vue'
import FormError from 'src/components/form/FormError.vue'
import FormInput from 'src/components/form/FormInput.vue'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import { emptySingleEmployee } from 'src/utils/constants'
import BaseIcon from 'src/icons/BaseIcon.vue'
import DeleteIcon from 'src/icons/DeleteIcon.vue'
import { EmployeeType, InputType } from 'src/utils/types'
import { PropType, onMounted, ref } from 'vue'
import ActionButton from 'src/components/layout/ActionButton.vue'

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

const emit = defineEmits(['edit-event', 'delete-event'])

onMounted(() => {
  console.log(props.employee)
  console.log(props.inputs)
})
</script>

<style scoped lang="scss">

.mario {
  border:1px solid black;
  display: flex;
}
</style>
