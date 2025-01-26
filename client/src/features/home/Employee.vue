<template>
  <h1 v-if="isEditing">Odje treba edit componenta</h1>
  <EmployeeInfo :employee="employee" @edit-event="editHandler"/>
</template>

<script setup lang="ts">
import { EmployeeType } from 'src/utils/types'
import { PropType, ref } from 'vue'
import EmployeeInfo from 'src/features/home/EmployeeInfo.vue'

const isEditing = ref<boolean>(false)

const props = defineProps({
  employee: {
    type: Object as PropType<EmployeeType>,
    required: true,
  },
})
const emit = defineEmits(['edit-event', 'delete-event'])


const editHandler = (id) => {
  console.log(id)
  isEditing.value = true
  // emit('edit-event', props.employee.id)
}

const deleteHandler = () => {
  emit('delete-event', props.employee.id)
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.employee {
  background-color: $secondary-color;
  color: $dark-color;
  &__actions {
    display: flex;
    gap: $medium;
    align-items: center;
  }
}
</style>
