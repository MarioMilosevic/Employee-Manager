<template>
  <fieldset class="checkbox">
    <label for="training">Training Completed?</label>
    <input id="training" type="checkbox" :checked="initialValue" @change="toggleCompleted" />
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  trainingCompleted: {
    type: Boolean,
    required: true,
  },
})
const emits = defineEmits(['checkbox-event'])
const initialValue = ref(props.trainingCompleted)

const toggleCompleted = (event: Event) => {
  const value = (event.target as HTMLInputElement).checked
  emits('checkbox-event', value)
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.checkbox {
  border: 1px solid $secondary-color;
  display: flex;
  gap: $small;
  padding: $small;
  border-radius: $small-radius;
}
</style>
