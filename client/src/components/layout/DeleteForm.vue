<template>
  <form class="modalForm">
    <h1>Delete {{ element }} ?</h1>
    <p>
      Are you sure you want to delete {{ props.fullName }} permanently ? <br />
      This action cannot be undone
    </p>
    <div class="modalForm__buttons">
      <ActionButton @click="emits('close-event')" color="green"> Cancel </ActionButton>
      <ActionButton @click="emits('delete-event')" color="red"> Delete </ActionButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import ActionButton from 'src/components/layout/ActionButton.vue'
import { useGetElement } from 'src/composables/useGetElement'

const { element } = useGetElement()
const props = defineProps({
  fullName: {
    type: String,
    required:true
  },
})

const emits = defineEmits(['close-event', 'delete-event'])
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.modalForm {
  display: flex;
  flex-direction: column;
  gap: $very-big;
  text-align: justify;

  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: $medium;
  }
}
</style>
