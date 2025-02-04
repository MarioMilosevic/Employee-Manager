<template>
  <div class="overlay">
    <div class="overlay__modal">
      <BaseIcon class="overlay__modal-button" fill="black" @click="closeModal" size="very-big">
        <CloseIcon />
      </BaseIcon>
      <AuthForm @submit.prevent="submitForm" class="overlay__modal-form form">
        <template #title>
          <TitleName color="black">Add New Employee</TitleName>
        </template>
        <template #inputs>
          <FormInputs>
            <template v-for="input in props.inputs" :key="input.id" #[input.name]>
              <FormBlock>
                <template #input>
                  <FormInput
                    v-bind="input"
                    v-model="employee[input.name as keyof typeof employee] as string"
                  />
                </template>
                <template #error>
                  <FormError>{{ formErrors[input.name as keyof typeof formErrors] }}</FormError>
                </template>
              </FormBlock>
            </template>
          </FormInputs>
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
import TitleName from 'src/components/layout/HeaderComp.vue'
import FormLabel from 'src/components/form/FormLabel.vue'
import FormInputs from 'src/components/form/FormInputs.vue'
import BaseIcon from 'src/icons/BaseIcon.vue'
import CloseIcon from 'src/icons/CloseIcon.vue'
import { employeeFormSchema } from 'src/validation/employeeFormSchema'
import { PropType, ref } from 'vue'
import { EmployeeErrorsType, EmployeeType } from 'src/utils/types'
import { renderValidationErrors } from 'src/utils/helpers'
import { InputType } from 'src/utils/types'
import { emptyEmployeeErrors } from 'src/utils/constants'

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

const employee = ref<EmployeeType>({ ...props.singleEmployee })

const formErrors = ref<EmployeeErrorsType>({ ...emptyEmployeeErrors })

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
    const updatedErorrs = renderValidationErrors(
      formErrors,
      validation.error.errors,
    ) as EmployeeErrorsType
    formErrors.value = updatedErorrs
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
      margin: 0 auto;

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
