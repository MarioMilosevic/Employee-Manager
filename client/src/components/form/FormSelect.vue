<template>
  <select class="select" :value="props.modelValue" @change="changeHandler">
    <option v-for="(option, index) in props.options" :key="index" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useSortFilterStore } from 'src/stores/sortFIlterOptionsStore'
import { useRouter } from 'vue-router'
const props = defineProps({
  options: {
    type: Array,
  },
  modelValue: {
    type: String,
    required: true,
  },
})

console.log(props.modelValue)

const sortFilterOptions = useSortFilterStore()
const router = useRouter()
const emits = defineEmits(['update:modelValue'])

const changeHandler = (e: Event) => {
  const target = (e.target as HTMLSelectElement).value
  const currentQuery = { ...router.currentRoute.value.query }
  router.push({
    path: router.currentRoute.value.path,
    query: { ...currentQuery, sort: target },
  })
  sortFilterOptions.setSortFilterOptions(target, 'sort')
  emits('update:modelValue', target)
}
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.select {
  padding: 0.6rem;
  border-radius: $small-radius;
  border: none;
  background-color: $secondary-color;
  outline: none;
  border: 1px solid $dark-color;
}
</style>
