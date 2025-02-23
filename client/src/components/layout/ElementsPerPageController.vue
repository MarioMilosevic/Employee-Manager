<template>
  <FormBlock class="elements">
    <template #label>
      <p class="elements__p">Show {{ element }}s per page</p>
    </template>
    <template #input>
      <FormSelect
        :options="elementsPerPageOptions"
        v-model="initialElementCount"
        :border="false"
        color="blue"
        @update:model-value="elementsPerPageHandler"
        class="elements__select"
      />
    </template>
  </FormBlock>
</template>

<script setup lang="ts">
import FormBlock from 'src/components/form/FormBlock.vue'
import FormSelect from 'src/components/form/FormSelect.vue'
import { usePageStore } from 'src/stores/pageStore'
import { ref, watch } from 'vue'
import { useGetElement } from 'src/composables/useGetElement'

const pageStore = usePageStore()
const initialElementCount = ref<number>(pageStore.pageStore.itemsPerPage)
const elementsPerPageOptions = [4, 5, 6, 8, 9, 10]
const { element } = useGetElement()

watch(
  () => pageStore.pageStore.itemsPerPage,
  (newItemsPerPage) => {
    initialElementCount.value = newItemsPerPage
  },
)

const elementsPerPageHandler = (value: string) => {
  const arg = Number(value)
  pageStore.setPageStore('page', 1)
  pageStore.setPageStore('itemsPerPage', arg)
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/abstracts/_mixins' as mixins;

.elements {
  display: flex;
  align-items: center;
  padding: $small;
  gap: $medium;

  @include mixins.respond(small) {
    padding: 0;
    gap: 0;
  }

  &__p {
    font-size: $medium;
  }

  &__select {
    @include mixins.respond(small) {
      width: 20%;
    }
  }
}
</style>
