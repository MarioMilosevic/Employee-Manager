<template>
  <div class="checkbox">
    <label for="training">Training Completed?</label>
    <input
      id="training"
      type="checkbox"
      :checked="initialValue"
      @change="toggleCompleted"
    />
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

export default {
  props: {
    trainingCompleted: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['checkbox-event'],
  setup(props, { emit }) {
    const initialValue = ref(props.trainingCompleted);

    watch(() => props.trainingCompleted, (newValue) => {
      initialValue.value = newValue;
    });

    const toggleCompleted = (event: Event) => {
      const value = (event.target as HTMLInputElement).checked;
      emit('checkbox-event', value);
    };

    return {
      initialValue,
      toggleCompleted,
    };
  },
};
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

.checkbox {
  border: 1px solid $secondary-color;
  display: flex;
  gap: $small;
  padding: $small;
  border-radius: $small-radius;
}
</style>
