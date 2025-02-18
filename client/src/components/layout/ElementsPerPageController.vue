<template>
  <FormBlock class="elements">
    <template #label>
      <p class="elements__p">Show elements per page</p>
    </template>
    <template #input>
      <FormSelect
        :options="elementsPerPageOptions"
        v-model="initialElementCount"
        color="purple"
        @update:model-value="elemenetsPerPageHandler"
        class="elements__select"
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
