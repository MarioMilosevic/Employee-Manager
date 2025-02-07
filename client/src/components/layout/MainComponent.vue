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
    <ActionButton color="white" size="big" @click="signOut(router, user)">Sign Out</ActionButton>
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
    @submit-event="submitHandler"
  />
</template>

<script setup lang="ts">
import FormModal from 'src/components/form/FormModal.vue'
import HeaderComp from 'src/components/layout/HeaderComp.vue'
import TableList from 'src/components/layout/TableList.vue'
import TableHeading from 'src/components/layout/TableHeading.vue'
import TableElement from 'src/components/layout/TableElement.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { signOut } from 'src/api/api'
import { ref, PropType, computed } from 'vue'
import { EmployeeType, UserType, InputType, TableHeadingType } from 'src/utils/types'
import { emptySingleEmployee, emptySingleUser } from 'src/utils/constants'
import { useRouter } from 'vue-router'

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
const singleElement = computed(() =>
  props.page === 'home' ? emptySingleEmployee : emptySingleUser
);


const router = useRouter()

const emits = defineEmits(['delete-event', 'edit-event', 'submit-event'])

const editHandler = (element: EmployeeType | UserType) => emits('edit-event', element)
const submitHandler = (element: EmployeeType | UserType) => {
  emits('submit-event', element)
  setModal(false)
}

const setModal = (value: boolean) => (isModalOpen.value = value)
</script>
