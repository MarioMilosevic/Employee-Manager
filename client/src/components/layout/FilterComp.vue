<template>
  <section class="section">
    <h3 class="section__title">
      <slot name="title" />
    </h3>
    <RenderlessComp>
      <template v-for="(option, index) in props.options" :key="option" #[option]>
        <ActionButton
          :color="index === selectedIndex ? 'purple' : 'white'"
          @click="filterHandler(index)"
        >
          {{ option }}
        </ActionButton>
      </template>
    </RenderlessComp>
  </section>
</template>

<script setup lang="ts">
import RenderlessComp from 'src/components/layout/RenderlessComp.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { PropType, ref } from 'vue'

const selectedIndex = ref<number>(0)

const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const filterHandler = (index: number) => {
  selectedIndex.value = index
}
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;
.section {
  grid-column: 1 / 3;
  display: grid;
  background-color: $primary-dark-color;
  padding: $medium;
  grid-template-columns: repeat(2, 1fr);
  gap: $medium;
  border-radius: $medium-radius;

  &__title {
    grid-column: 1/3;
  }
}
</style>
