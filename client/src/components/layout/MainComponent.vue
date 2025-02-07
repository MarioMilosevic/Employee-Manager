<template>
  <HeaderComp align="center">
    <template #title> Employee Manager </template>
    <template #button v-if="user?.role === 'ADMIN'">
      <slot name="button" />
    </template>
  </HeaderComp>
  <h2>
    <slot name="subtitle" />
  </h2>
  <div class="buttons">
    <ActionButton color="white" size="big" @click="setModal(true)">
      <slot name="leftButton" />
    </ActionButton>

    <slot name="rightButton" />
  </div>

  <TableList :page="props.page">
    <template #headings>
      <TableHeading v-for="heading in tableHeadings" :key="heading.id">
        {{ heading.name }}
      </TableHeading>
    </template>
    <template #elements>
      <TableElement
        v-for="el in elements"
        class="home"
        :key="el.id"
        :element="el"
        :inputs="props.inputs"
        @delete-event="emits('delete-event', el.id)"
        @edit-event="editHandler"
      />
    </template>
  </TableList>

  <FormModal
    v-if="isModalOpen"
    :singleElement="singleElement"
    :inputs="props.inputs"
    @close-modal="setModal(false)"
    @submit-event="emits('submit-event')"
  />
</template>

<script setup lang="ts">
import FormModal from 'src/components/form/FormModal.vue'
import HeaderComp from 'src/components/layout/HeaderComp.vue'
import TableList from 'src/components/layout/TableList.vue'
import TableHeading from 'src/components/layout/TableHeading.vue'
import TableElement from 'src/components/layout/TableElement.vue'

import { ref, PropType } from 'vue'
import { EmployeeType, UserType, InputType, TableHeadingType } from 'src/utils/types'
import ActionButton from 'src/components/layout/ActionButton.vue'

const props = defineProps({
  inputs: {
    type: Array as PropType<InputType[]>,
    required: true,
  },
  elements: {
    type: Array as PropType<EmployeeType[] | UserType[]>,
    required: true,
  },
  tableHeadings: {
    type: Array as PropType<TableHeadingType[]>,
    required: true,
  },
  page: {
    type: String as PropType<'home' | 'dashboard'>,
    required: true,
  },
  user: {
    type: Object as PropType<UserType>,
    required: true,
  },
})

const isModalOpen = ref<boolean>(false)
const singleElement = ref<EmployeeType | UserType>({})

const emits = defineEmits(['delete-event', 'edit-event', 'submit-event'])

const editHandler = (element:EmployeeType | UserType) => {
  emits('edit-event', element)
}

const setModal = (value: boolean) => {
  isModalOpen.value = value
}
</script>
