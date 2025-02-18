<template>
  <tr class="table__row" :style="{ position: 'relative' }">
    <FormBlock v-for="input in props.inputs" :key="input.id">
      <template #input>
        <FormSelect
          v-if="input.name === 'department' || input.name === 'employment'"
          :options="input.options"
          v-model="selectedElement[input.name as keyof typeof selectedElement] as string"
        />
        <FormInput
          v-else
          v-bind="input"
          v-model="selectedElement[input.name as keyof typeof selectedElement] as string"
          align="center"
        />
      </template>
    </FormBlock>
    <td data-cell="Training">
      <FormCheckbox
        v-if="'address' in props.element"
        :trainingCompleted="(selectedElement as EmployeeType).trainingCompleted"
        @checkbox-event="toggleTrainingCompleted"
      />
    </td>
    <BaseIcon size="big" @click="emit('close-event', props.element.id)" class="close">
      <CloseIcon />
    </BaseIcon>
    <th class="smallActions actions">
      <BaseIcon size="big" stroke="#22c55e" @click="emit('edit-event', selectedElement)">
        <ConfirmIcon />
      </BaseIcon>
      <BaseIcon size="big" stroke="#ef4444" @click="isModalOpen = true">
        <DeleteIcon />
      </BaseIcon>
    </th>

    <OverlayComp v-if="isModalOpen">
      <template #default>
        <ModalComp class="editModal">
          <template #button>
            <BaseIcon class="closeButton" fill="white" @click="isModalOpen = false" size="very-big">
              <CloseIcon />
            </BaseIcon>
          </template>
          <template #default>
            <DeleteForm
              @close-event="isModalOpen = false"
              @delete-event="emit('delete-event')"
              :full-name="props.element.fullName"
            />
          </template>
        </ModalComp>
      </template>
    </OverlayComp>
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
import FormSelect from 'src/components/form/FormSelect.vue'
import OverlayComp from 'src/components/layout/OverlayComp.vue'
import ModalComp from 'src/components/layout/ModalComp.vue'
import { EmployeeType, InputType, ElementType } from 'src/utils/types'
import { PropType, ref } from 'vue'
import DeleteForm from 'src/components/layout/DeleteForm.vue'

const props = defineProps({
  element: {
    type: Object as PropType<ElementType>,
    required: true,
  },
  inputs: {
    type: Array as PropType<InputType[]>,
    required: true,
  },
})

const selectedElement = ref({ ...props.element })
const isModalOpen = ref<boolean>(false)

const emit = defineEmits(['edit-event', 'delete-event', 'close-event'])

const toggleTrainingCompleted = (value: boolean) => {
  if ('trainingCompleted' in selectedElement.value) {
    selectedElement.value.trainingCompleted = value
  }
}
</script>

<style scoped lang="scss">
.close {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
