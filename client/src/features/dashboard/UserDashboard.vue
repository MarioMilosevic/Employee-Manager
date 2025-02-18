<template>
  <TableElementInfo
    class="dashboard"
    :element="props.element"
    @edit-event="isEditing = true"
    @delete-event="emits('delete-event')"
  />


</template>

<script setup lang="ts">
import TableElementInfo from 'src/components/layout/TableElementInfo.vue'

import { UserType } from 'src/utils/types'
import { PropType, ref } from 'vue'

const emits = defineEmits(['delete-event'])

const isEditing = ref<boolean>(false)

const props = defineProps({
  element: {
    type: Object as PropType<UserType>,
    required: true,
  },
})
</script>
