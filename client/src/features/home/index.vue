<template>
  <TitleName>Employee Manager</TitleName>
  <FormComponent @submit.prevent="submitForm" class="form">
    <template #firstName>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="firstName"
            type="text"
            placeholder="First Name"
            :value="singleEmployee.firstName"
            @update-value="updateFormState"
          />
        </template>
        <template #error>
          <FormError>{{ formErrors.firstName }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #lastName>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="lastName"
            type="text"
            placeholder="Last Name"
            :value="singleEmployee.lastName"
            @update-value="updateFormState"
          />
        </template>
        <template #error>
          <FormError>{{ formErrors.lastName }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #address>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="address"
            type="text"
            placeholder="Address"
            :value="singleEmployee.address"
            @update-value="updateFormState"
          />
        </template>
        <template #error>
          <FormError>{{ formErrors.address }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #startYear>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="startYear"
            type="date"
            placeholder="Start Year"
            :value="singleEmployee.startYear"
            @update-value="updateFormState"
          />
        </template>
        <template #error>
          <FormError>{{ formErrors.startYear }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #trainingCompleted>
      <FormCheckbox
        :trainingCompleted="singleEmployee.trainingCompleted"
        @checkbox-event="setTrainingCompleted"
      />
    </template>
    <template #submit>
      <ActionButton color="white" type="submit" :style="{ justifySelf: 'start' }">
        Submit
      </ActionButton>
    </template>
  </FormComponent>

  <EmployeeInfo
    v-for="employee in employees"
    :key="employee.id"
    :employee="employee"
    @edit-event="editEmployee"
    @delete-event="deleteEmployee"
  />
  <FormModal
    :isModalOpen="isModalOpen"
    @close-modal="setModal(false)"
    @update-event="updateEmployees"
    :singleEmployee="singleEmployee"
  />
</template>

<script lang="ts" setup>
import FormModal from 'src/components/form/FormModal.vue'
import TitleName from 'src/components/layout/TitleName.vue'
import FormInput from 'src/components/form/FormInput.vue'
import FormComponent from 'src/components/form/FormComponent.vue'
import EmployeeInfo from 'src/components/layout/EmployeeInfo.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import FormBlock from 'src/components/form/FormBlock.vue'
import FormError from 'src/components/form/FormError.vue'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import { renderValidationErrors } from 'src/utils/helpers'
import { emptyEmployeeErrors } from 'src/utils/constants'
// import { postData, getEmployees, deleteData } from 'src/api/employeeApi'
import { EmployeeType } from 'src/utils/types'
import { employeeFormSchema } from 'src/validation/employeeFormSchema'
import { ref, onMounted } from 'vue'
import { getData, deleteData, postData } from 'src/api/api'

const employees = ref([] as EmployeeType[])
const isModalOpen = ref(false)

const singleEmployee = ref({
  id: 0,
  firstName: '',
  lastName: '',
  address: '',
  startYear: '',
  trainingCompleted: false,
})

const formErrors = ref(emptyEmployeeErrors)

const fetchEmployees = async () => {
  try {
    const data = await getData('/employee')
    employees.value = data
  } catch (error) {
    console.error('Failed to fetch employees', error)
  }
}

onMounted(fetchEmployees)

const updateFormState = <K extends keyof typeof singleEmployee.value>(
  key: K,
  value: (typeof singleEmployee.value)[K],
) => {
  singleEmployee.value[key] = value
}

const updateEmployees = async (updatedEmployee: EmployeeType) => {
  employees.value = employees.value.map((emp) =>
    emp.id === updatedEmployee.id ? updatedEmployee : emp,
  )
  setModal(false)
}

const setTrainingCompleted = (value: boolean) => {
  singleEmployee.value.trainingCompleted = value
}

const addEmployee = (employee: EmployeeType) => {
  employees.value = [...employees.value, employee]
}

const removeEmployee = (employee: EmployeeType) => {
  employees.value = employees.value.filter((emp) => emp.id !== employee.id)
}

const resetForm = () => {
  formErrors.value = emptyEmployeeErrors
}

const submitForm = async () => {
  const validation = employeeFormSchema.safeParse(singleEmployee.value)
  if (validation.success) {
    const response = await postData(validation.data, '/employee')
    addEmployee(response)
    resetForm()
  } else {
    const updatedErorrs = renderValidationErrors(formErrors, validation.error.errors)
    formErrors.value = updatedErorrs
  }
}

const editEmployee = async (id: string) => {
  const response = await getData(`/employee/${id}`)
  singleEmployee.value = response
  setModal(true)
}

const deleteEmployee = async (id: string) => {
  const data = await deleteData(id)
  removeEmployee(data)
}

const setModal = (value: boolean) => {
  isModalOpen.value = value
}
</script>

<style scoped lang="scss">
@use 'src/scss/_variables' as *;

.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $primary-shade-color;
  padding: $big;
  border-radius: $small-radius;
}
</style>
