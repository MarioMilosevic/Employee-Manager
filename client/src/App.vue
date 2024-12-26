<template>
  <TitleName>Employee Manager</TitleName>
  <EmployeeForm>
    <template #firstName>
      <FormBlock>
        <template #label>
          <FormLabel id="firstName">
            <template #text>
              <p>Ovo je text za label</p>
            </template>
          </FormLabel>
        </template>
        <template #input>
          <FormInput id="firstName" type="text" placeholder="First Name"/>
        </template>
      </FormBlock>
    </template>
  </EmployeeForm>
  <!-- <FormInput placeholder="First Name" type="text" />
  <FormInput placeholder="Last Name" type="text"/>
  <FormInput placeholder="Start Year" type="number"/>
  <FormInput placeholder="Address" type="text"/>
  <label for="checkbox">Has Completed Training</label>
  <input id="checkbox" type="checkbox"> -->
  <!-- <FormInput placeholder="" type="number"/> -->
</template>

<script lang="ts">
import TitleName from 'src/components/layout/TitleName.vue';
import FormInput from 'src/components/form/FormInput.vue';
import EmployeeForm from 'src/components/form/EmployeeForm.vue';
import FormBlock from 'src/components/form/FormBlock.vue';
import FormLabel from 'src/components/form/FormLabel.vue';
export default {
  setup() {},
  components: {
    TitleName,
    FormInput,
    FormLabel,
    EmployeeForm,
    FormBlock
  },
}
</script>

<style scoped lang="scss"></style>
