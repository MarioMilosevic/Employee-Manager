<template>
  <aside :class="['sidebar', { isOpen: isSidebarOpen }]">
    <BaseIcon v-if="isSidebarOpen" class="sidebar__icon" size="big" @click="emits('sidebar-event')">
      <CloseIcon />
    </BaseIcon>
    <template v-for="array in props.options" :key="array[0]">
      <FilterComp :options="array.slice(1)" :category="array[0]">
        <template #title>
          {{ array[0] }}
        </template>
      </FilterComp>
    </template>
  </aside>
  <div
    class="sidebar__overlay"
    :style="{ visibility: isSidebarOpen ? 'visible' : 'hidden' }"
    @click="emits('sidebar-event')"
  ></div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import FilterComp from 'src/components/layout/FilterComp.vue'
import CloseIcon from 'src/icons/CloseIcon.vue'
import BaseIcon from 'src/icons/BaseIcon.vue'

const props = defineProps({
  options: {
    type: Array as PropType<string[][]>,
    required: true,
  },
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['sidebar-event'])
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;
@use 'src/scss/abstracts/_mixins' as mixins;

.sidebar {
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: $medium;

  @include mixins.respond(small) {
    position: fixed;
    left: 0%;
    top: 30%;
    transform: translateX(-100%);
    z-index: 2;
    transition: all;
    transition-duration: 300ms;

    &.isOpen {
      transform: translateX(0);
      background-color: $primary-color;
      border-radius: $medium-radius;
    }
  }

  &__icon {
    position: absolute;
    top: 2%;
    right: 3%;
  }

  &__overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0%;
    right: 0%;
    z-index: 1;
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.6);
    visibility: hidden;
    display: none;

    @include mixins.respond(small) {
      display: block;
    }
  }
}
</style>
