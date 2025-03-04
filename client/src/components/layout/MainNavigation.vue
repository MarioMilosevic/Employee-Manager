<template>
  <nav class="nav">
    <div class="nav__left">
      <BaseIcon class="nav__left-icon" size="big" @click="emits('navigation-event')">
        <HamburgerIcon />
      </BaseIcon>
      <h3 class="nav__left-title">
        Found {{ pageStore.pageStore.elementsCount }} {{ element }}s in total
      </h3>
      
    </div>
    <SortComp class="nav__sort" :sort-options="props.sortOptions" />
  </nav>
</template>

<script setup lang="ts">
import BaseIcon from 'src/icons/BaseIcon.vue'
import SortComp from 'src/components/layout/SortComp.vue'
import HamburgerIcon from 'src/icons/HamburgerIcon.vue'
import { ElementType } from 'src/utils/types'
import { PropType } from 'vue'
import { usePageStore } from 'src/stores/pageStore'
import { useGetElement } from 'src/composables/useGetElement'

const { element } = useGetElement()

const props = defineProps({
  elements: {
    type: Array as PropType<ElementType[]>,
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

const emits = defineEmits(['navigation-event'])

const pageStore = usePageStore()
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/abstracts/_mixins' as mixins;

.nav {
  grid-column: 1 / 9;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__left {
    @include mixins.respond(small) {
      display: flex;
      align-items: center;
      gap: $medium;
    }

    &-title {
      @include mixins.respond(small) {
        font-size: $medium;
      }
    }

    &-icon {
      display: none;

      @include mixins.respond(small) {
        display: block;
      }
    }
  }

  &__sort {
    @include mixins.respond(small) {
      display: none;
    }
  }
}
</style>
