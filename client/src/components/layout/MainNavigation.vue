<template>
  <nav class="nav">
    <div class="nav__left">
      <BaseIcon class="nav__left-icon" size="big" @click="emits('navigation-event')">
        <HamburgerIcon />
      </BaseIcon>
      <h3 class="nav__left-title">Found {{ pageStore.pageStore.elementsCount }} {{ element }}s</h3>
      <FormBlock class="nav__left-input">
        <template #input>
          <FormInput v-model="searchValue" @update:model-value="mario" />
        </template>
      </FormBlock>
    </div>
    <SortComp class="nav__sort" :sort-options="props.sortOptions" />
  </nav>
</template>

<script setup lang="ts">
import BaseIcon from 'src/icons/BaseIcon.vue'
import SortComp from 'src/components/layout/SortComp.vue'
import HamburgerIcon from 'src/icons/HamburgerIcon.vue'
import { ElementType } from 'src/utils/types'
import { PropType, ref } from 'vue'
import { usePageStore } from 'src/stores/pageStore'
import { useGetElement } from 'src/composables/useGetElement'
import FormBlock from '../form/FormBlock.vue'
import FormInput from '../form/FormInput.vue'

const { element } = useGetElement()

const searchValue = ref<string>('')

const mario = (value: string) => {
  console.log(value)
}

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
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: $medium;

  &__left {
    grid-column: 1/7;
    align-items: center;
    display: flex;
    gap: $huge;
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

    &-input {
      width: 30%;
    }
  }

  &__sort {
    grid-column: 7/9;
    @include mixins.respond(small) {
      display: none;
    }
  }
}
</style>
