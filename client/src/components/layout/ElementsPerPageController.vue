<template>
  <FormBlock class="elements">
    <template #label>Show elements per page</template>
    <template #input>
      <FormSelect
        :options="elementsPerPageOptions"
        v-model="initialElementCount"
        color="purple"
        @update:model-value="elemenetsPerPageHandler"
      />
    </template>
  </FormBlock>
</template>

<script setup lang="ts">
import FormBlock from 'src/components/form/FormBlock.vue'
import FormSelect from 'src/components/form/FormSelect.vue'
import { usePageStore } from 'src/stores/pageStore'
import { ref } from 'vue'

const pageStore = usePageStore()
const initialElementCount = ref<number>(8)
const elementsPerPageOptions = [4, 5, 6, 8, 9, 10]

const elemenetsPerPageHandler = (value: string) => {
  const arg = Number(value)
  pageStore.setPage(1)
  pageStore.setItemsPerPage(arg)
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.elements {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: $medium;
}
</style>
