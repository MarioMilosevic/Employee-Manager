<template>
  <div class="overlay">
    <div class="overlay__modal">
      <h2 class="overlay__modal-title">Edit Employee</h2>
      <button @click="closeModal" class="overlay__modal-button">X</button>
      <AuthForm @submit.prevent="submitForm" class="overlay__modal-form" :inputs="props.inputs">
        <template v-for="input in props.inputs" :key="input.id" #[input.name]>
          <FormBlock>
            <template #input>
              <FormInput
                v-bind="input"
                v-model="employee[input.name as keyof typeof employee]"
              />
            </template>
            <template #error>
              <FormError>{{ formErrors[input.name as keyof typeof formErrors] }}</FormError>
            </template>
          </FormBlock>
        </template>
        <template #default>
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
      </AuthForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import AuthForm from 'src/components/form/AuthForm.vue'
import FormError from 'src/components/form/FormError.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import { employeeFormSchema } from 'src/validation/employeeFormSchema'
import { PropType, ref } from 'vue'
import { EmployeeType } from 'src/utils/types'
import { editData } from 'src/api/api'
import { InputType } from 'src/utils/types'

const emits = defineEmits(['close-modal', 'update-event'])
const props = defineProps({
  singleEmployee: {
    type: Object as PropType<EmployeeType>,
    required: true,
  },
  inputs: {
    type: Array as PropType<InputType[]>,
    required: true,
  },
})

const employee = ref({ ...props.singleEmployee })

const formErrors = ref({
  firstName: '',
  lastName: '',
  address: '',
  startYear: '',
})

const closeModal = () => {
  emits('close-modal')
}

const setTrainingCompleted = (value: boolean) => (employee.value.trainingCompleted = value)

const submitForm = async () => {
  console.log('kada submitam', employee.value)
  const validation = employeeFormSchema.safeParse(employee.value)
  if (validation.success) {
    console.log(validation.data)
    const validationData = {
      id: employee.value.id,
      ...validation.data,
    }

    const response = await editData(validationData, `employee/${employee.value.id}`)
    console.log(response)
    emits('update-event', response.data)
  } else {
    const errors = validation.error.errors
    errors.forEach((error) => {
      console.log(error)
      const field = error.path[0] as keyof typeof formErrors
      formErrors[field] = error.message
    })
  }
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.overlay {
  z-index: 10;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.6);

  &__modal {
    border-radius: $medium-radius;
    z-index: 20;
    position: fixed;
    top: 50%;
    left: 50%;
    max-width: 1100px;
    width: 100%;
    transform: translate(-50%, -50%);
    background-color: $primary-color;
    padding: $medium $small;
    display: flex;
    flex-direction: column;
    gap: $medium;
    justify-content: space-between;

    &-button {
      position: absolute;
      top: 7%;
      right: 1%;
      border: none;
      cursor: pointer;
      background-color: $dark-color;
      color: $secondary-color;
      padding: 0.2rem 0.3rem;
    }

    &-form {
      display: flex;
      gap: $medium;
      align-items: center;
      background-color: $primary-shade-color;
      padding: $medium;
      border-radius: $small-radius;
    }
  }
}
</style>
