<template>
  <tr class="table__row">
    <td data-cell="Full Name">{{ props.element.fullName }}</td>
    <td data-cell="Role">{{ props.element.role }}</td>
    <td data-cell="Email">{{ props.element.email }}</td>
    <td data-cell="Created Date">{{ props.element.createdDate }}</td>
      <BaseIcon class="smallActions" size="big" stroke="#ef4444" @click="isModalOpen = true">
        <DeleteIcon />
      </BaseIcon>

    <OverlayComp v-if="isModalOpen">
      <template #default>
        <ModalComp class="editModal">
          <template #button>
            <BaseIcon class="closeButton" fill="white" @click="isModalOpen = false" size="very-big">
              <CloseIcon />
            </BaseIcon>
          </template>
          <template #default>
            <DeleteForm @close-event="isModalOpen = false" @delete-event="emits('delete-event')" :full-name="props.element.fullName"/>
          </template>
        </ModalComp>
      </template>
    </OverlayComp>
  </tr>
</template>

<script setup lang="ts">
import { UserType } from 'src/utils/types'
import { PropType, ref } from 'vue'
import OverlayComp from 'src/components/layout/OverlayComp.vue'
import ModalComp from 'src/components/layout/ModalComp.vue'
import BaseIcon from 'src/icons/BaseIcon.vue'
import CloseIcon from 'src/icons/CloseIcon.vue'
import DeleteForm from 'src/components/layout/DeleteForm.vue'
import DeleteIcon from 'src/icons/DeleteIcon.vue'

const isModalOpen = ref<boolean>(false)

const props = defineProps({
  element: {
    type: Object as PropType<UserType>,
    required: true,
  },
})

const emits = defineEmits(['delete-event'])
</script>