<template>
  <nav class="nav">
    <p>{{ elementsLength }} {{ elementName }} found</p>
    <FormBlock>
      <template #label>
        <FormLabel id="sort">
          <p>Sort by:</p>
        </FormLabel>
      </template>
      <template #input>
        <FormSelect id="sort" :options="props.sortOptions"/>
      </template>
    </FormBlock>
  </nav>
</template>

<script setup lang="ts">
import { EmployeeType, UserType } from 'src/utils/types'
import { PropType, computed } from 'vue'
import FormBlock from 'src/components/form/FormBlock.vue'
import FormLabel from 'src/components/form/FormLabel.vue'
import FormSelect from 'src/components/form/FormSelect.vue'

const props = defineProps({
  elements: {
    type: Array as PropType<EmployeeType[] | UserType[]>,
    required: true,
  },
  page: {
    type: String as PropType<'home' | 'dashboard'>,
    required: true,
  },
  sortOptions: {
    type: Array as PropType<string[]>,
    required: true,
  },
})


const elementsLength = computed(() => {
  return props.elements.length
})

const elementName = computed(() => {
  return props.page === 'home' ? 'employees' : 'users'
})
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.nav {
  grid-column: 1 / 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
