<template>
  <FormBlock class="nav__left-input">
    <template #input>
      <FormInput
        v-bind="searchObj"
        v-model="localSearchValue"
        @update:model-value="searchHandler"
      />
    </template>
  </FormBlock>
</template>

<script setup lang="ts">
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import { ref } from 'vue'
import { searchObj } from 'src/utils/constants'

const localSearchValue = ref<string>('')

const emits = defineEmits(['search-event'])

const searchHandler = (value: string) => {
  localSearchValue.value = value
  emits('search-event', value)
}
</script>

<style scoped></style>
