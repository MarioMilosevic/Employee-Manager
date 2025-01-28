<template>
  <div class="overlay">
    <div class="overlay__modal">
      <BaseIcon class="overlay__modal-button" fill="black" @click="closeModal" size="very-big">
        <CloseIcon />
      </BaseIcon>
      <AuthForm @submit.prevent="submitForm" class="overlay__modal-form" :inputs="props.inputs">
        <template #title>
          <TitleName color="black">Add New Employee</TitleName>
        </template>

        <template v-for="input in props.inputs" :key="input.id" #[input.name]>
          <FormBlock v-if="input.type === 'date'">
            <template #label>
              <FormLabel class="overlay__modal-form-label" id="date">Start Date ?</FormLabel>
            </template>
            <template #input>
              <FormInput
                v-bind="input"
                v-model="employee[input.name as keyof typeof employee]"
                class="overlay__modal-form-date"
              />
            </template>
            <template #error>
              <FormError>{{ formErrors[input.name as keyof typeof formErrors] }}</FormError>
            </template>
          </FormBlock>
          <FormBlock v-else>
            <template #input>
              <FormInput v-bind="input" v-model="employee[input.name as keyof typeof employee]" />
            </template>
            <template #error>
              <FormError>{{ formErrors[input.name as keyof typeof formErrors] }}</FormError>
            </template>
          </FormBlock>
        </template>

        <template #default>
          <FormBlock>
            <template #label>
              <FormLabel id="checkbox" class="overlay__modal-form-label"
                >Completed Training ?</FormLabel
              >
            </template>
            <template #input>
              <FormCheckbox
                class="overlay__modal-form-checkbox"
                id="checkbox"
                :disabled="false"
                :trainingCompleted="singleEmployee.trainingCompleted"
                @checkbox-event="setTrainingCompleted"
              />
            </template>
          </FormBlock>
        </template>

        <template #submit>
          <ActionButton
            size="medium"
            color="purple"
            type="submit"
            :style="{ justifySelf: 'start' }"
          >
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
import TitleName from 'src/components/layout/TitleName.vue'
import FormLabel from 'src/components/form/FormLabel.vue'
import { employeeFormSchema } from 'src/validation/employeeFormSchema'
import { PropType, ref } from 'vue'
import { EmployeeType } from 'src/utils/types'
import { renderValidationErrors } from 'src/utils/helpers'
import { InputType } from 'src/utils/types'
import BaseIcon from 'src/icons/BaseIcon.vue'
import CloseIcon from 'src/icons/CloseIcon.vue'

const emits = defineEmits(['close-modal', 'submit-event'])
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
    emits('submit-event', employee.value)
  } else {
    const updatedErorrs = renderValidationErrors(formErrors, validation.error.errors)
    formErrors.value = updatedErorrs
  }
  // const validationData = {
  //   id: employee.value.id,
  //   ...validation.data,
  // }

  // const response = await editData(validationData, `employee/${employee.value.id}`)
  // console.log(response)
  // emits('update-event', response.data)
  // } else {
  //   console.log('nije dobro')

  //   const updatedErorrs = renderValidationErrors(formErrors, validation.error.errors)
  //   formErrors.value = updatedErorrs
  // const errors = validation.error.errors
  // errors.forEach((error) => {
  //   console.log(error)
  //   const field = error.path[0] as keyof typeof formErrors
  //   formErrors[field] = error.message
  // })
  // }
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
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    gap: $very-big;

    &-button {
      position: absolute;
      top: 1%;
      right: 1%;
      border: none;
      cursor: pointer;
    }

    &-form {
      display: flex;
      flex-direction: column;
      gap: $medium;
      background-color: $primary-shade-color;
      background-color: $secondary-color;
      padding: $big $very-big;
      max-width: $max-form-width;
      width: 100%;
      margin: 0 auto;
      border-radius: $medium-radius;

      &-label {
        font-size: $medium-font;
        color: $placeholder-color;
      }

      &-checkbox {
        position: absolute;
        top: 50%;
        right: 3%;
        transform: translateY(-50%);
      }

      &-date {
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        border-left: none;
        border-radius: 0;
      }
    }
  }
}
</style>
