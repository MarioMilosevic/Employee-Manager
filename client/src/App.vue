<template>
  <TitleName>Employee Manager</TitleName>
  <EmployeeForm>
    <template #firstName>
      <FormInput type="text" placeholder="First Name" />
    </template>
    <template #lastName>
      <FormInput type="text" placeholder="Last Name" />
    </template>
    <template #address>
      <FormInput type="text" placeholder="Address" />
    </template>
    <template #startYear>
      <FormInput type="number" placeholder="Start Year" />
    </template>
    <template #trainingCompleted>
      <div class="checkbox">
        <label for="training">Training Completed ?</label>
        <input id="training" type="checkbox" />
      </div>
    </template>
  </EmployeeForm>
</template>

<script lang="ts">
import TitleName from 'src/components/layout/TitleName.vue'
import FormInput from 'src/components/form/FormInput.vue'
import EmployeeForm from 'src/components/form/EmployeeForm.vue'
export default {
  setup() {},
  components: {
    TitleName,
    FormInput,
    EmployeeForm,
  },
}
</script>

<style scoped lang="scss">
@use 'src/scss/_variables' as *;

.checkbox {
  border: 1px solid white;
  display: flex;
  align-items: center;
  gap: $medium;
  padding: $small;
  border-radius: $small-radius;
}
</style>
