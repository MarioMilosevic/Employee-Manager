<template>
  <HeaderComp align="center">
    <template #title>
      <slot v-if="slots.title" name="title" />
    </template>
    <template #button v-if="slots.button">
      <slot name="button" />
    </template>
  </HeaderComp>
  <h2>
    <slot name="subtitle" />
  </h2>
  <div class="buttons">
    <ActionButton color="white" size="big" @click="setModal(true)" v-if="slots.leftButton" class="leftButton">
      <slot name="leftButton" />
    </ActionButton>
    <ActionButton
      color="white"
      :style="{ marginLeft: 'auto' }"
      size="big"
      @click="signOut(router, user)"
      >Sign Out</ActionButton
    >
  </div>

  <main class="main">
    <SortNavigation :elements="elements" :page="page" :sort-options="sortOptions" @navigation-event="isSidebarOpen = true"/>
    <MainSidebar :options="options" :is-sidebar-open="isSidebarOpen" @sidebar-event="isSidebarOpen = false"/>
    <TableList :page="props.page" class="main__table">
      <template #headings>
        <TableHeading v-for="heading in tableHeadings" :key="heading.id">
          {{ heading.name }}
        </TableHeading>
      </template>
      <template #elements>
        <NoElements v-if="elements.length === 0" :page="page" />
        <TableElement
          v-else
          v-for="el in elements"
          :class="props.page"
          :key="el.id"
          :element="el"
          :inputs="props.inputs"
          @delete-event="emits('delete-event', el.id)"
          @edit-event="editHandler"
        />
      </template>
    </TableList>

    <PaginationComp @next-page-event="nextPage" @previous-page-event="previousPage" />
    <FooterComp />
  </main>

  <FormModal
    v-if="isModalOpen"
    :singleElement="singleElement"
    :inputs="props.inputs"
    @close-modal="setModal(false)"
    @submit-event="submitHandler"
  >
    <template v-if="slots.modalTitle" #modalTitle>
      <slot name="modalTitle" />
    </template>
  </FormModal>
</template>

<script setup lang="ts">
import FormModal from 'src/components/form/FormModal.vue'
import HeaderComp from 'src/components/layout/HeaderComp.vue'
import TableList from 'src/components/layout/TableList.vue'
import TableHeading from 'src/components/layout/TableHeading.vue'
import TableElement from 'src/components/layout/TableElement.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import MainSidebar from 'src/components/layout/MainSidebar.vue'
import SortNavigation from 'src/components/layout/SortNavigation.vue'
import PaginationComp from 'src/components/layout/PaginationComp.vue'
import NoElements from 'src/components/layout/NoElements.vue'
import FooterComp from 'src/components/layout/FooterComp.vue'
import { signOut } from 'src/api/api'
import { ref, PropType, computed } from 'vue'
import { UserType, InputType, TableHeadingType, ElementType } from 'src/utils/types'
import { emptySingleEmployee, emptySingleUser } from 'src/utils/constants'
import { useRouter } from 'vue-router'
import { usePageStore } from 'src/stores/pageStore'

const isSidebarOpen = ref<boolean>(false)

const slots = defineSlots()

const props = defineProps({
  inputs: {
    type: Array as PropType<InputType[]>,
    required: true,
  },
  elements: {
    type: Array as PropType<ElementType[]>,
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
  options: {
    type: Array as PropType<string[][]>,
    required: true,
  },
  sortOptions: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const isModalOpen = ref<boolean>(false)

const pageStore = usePageStore()

const singleElement = computed(() =>
  props.page === 'home' ? emptySingleEmployee : emptySingleUser,
)

const router = useRouter()

const emits = defineEmits(['delete-event', 'edit-event', 'submit-event'])

const editHandler = (element: ElementType) => emits('edit-event', element)
const submitHandler = (element: ElementType) => {
  emits('submit-event', element)
  setModal(false)
}

const nextPage = () => {
  if (pageStore.page < pageStore.elementsCount / pageStore.itemsPerPage) {
    pageStore.setPage(pageStore.page + 1)
  }
}

const previousPage = () => {
  if (pageStore.page > 1) {
    pageStore.setPage(pageStore.page - 1)
  }
}

const setModal = (value: boolean) => (isModalOpen.value = value)
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/abstracts/_mixins' as mixins;

.main {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: $medium;

  &__table {
    grid-column: 2/9;

     @include mixins.respond(small) {
      grid-column: 1/9;
    }
  }
}
</style>
