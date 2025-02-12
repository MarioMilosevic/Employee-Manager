<template>
  <section class="section">
    <BaseIcon fill="black" stroke="black" viewBox="0 0 131 137" class="section__icon">
      <InspectorIcon />
    </BaseIcon>
    <h1>No {{ element }} found. Try other filter options</h1>
    <BaseIcon fill="black" stroke="black" viewBox="0 0 131 137" class="section__icon">
      <InspectorIcon />
    </BaseIcon>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from 'src/icons/BaseIcon.vue'
import InspectorIcon from 'src/icons/InspectorIcon.vue'
import { computed } from 'vue'

const props = defineProps({
  page: {
    type: String,
    required: true,
  },
})

const element = computed(() => {
  return props.page === 'home' ? 'employees' : 'users'
})
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.section {
  display: flex;
  padding-top: $medium;
  justify-content: space-between;
  align-items: center;
  gap: $very-big;

  &__icon {
    width: 8.5rem;
    height: 8.5rem;
  }
}
</style>
