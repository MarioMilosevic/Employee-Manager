<template>

  <OverlayComp>
    <template #default>
      <ModalComp>
        <template #button>
    <BaseIcon class="closeButton" fill="black" @click="closeModal" size="very-big">
        <CloseIcon />
      </BaseIcon>
        </template>
        <template #default>
 <AuthForm @submit.prevent="submitForm" class="authForm form">
        <template #title>
          <HeaderComp color="black" margin-bottom="2rem">
            <template #title> <slot name="modalTitle" /> </template>
          </HeaderComp>
        </template>
        <template #inputs>
          <RenderlessComp>
            <template v-for="input in props.inputs" :key="input.id" #[input.name]>
              <FormBlock>
                <template #input>
                  <FormSelect
                    v-if="input.name === 'department' || input.name === 'employment'"
                    :options="input.options"
                    class="authForm__select"
                    v-model="element[input.name as keyof typeof element] as string"
                  />
                  <FormInput
                    v-else
                    v-bind="input"
                    v-model="element[input.name as keyof typeof element] as string | undefined"
                  />
                </template>
                <template #error>
                  <FormError>{{ formErrors[input.name as keyof typeof formErrors] }}</FormError>
                </template>
              </FormBlock>
            </template>
          </RenderlessComp>
        </template>
        <template #default>
          <FormBlock v-if="'trainingCompleted' in singleElement">
            <template #label>
              <FormLabel id="checkbox" class="authForm__label">Completed Training ?</FormLabel>
            </template>
            <template #input>
              <FormCheckbox
                class="authForm__checkbox"
                id="checkbox"
                :disabled="false"
                :trainingCompleted="singleElement.trainingCompleted"
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
        </template>
      </ModalComp>
    </template>
  </OverlayComp>
</template>

<script lang="ts" setup>
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import AuthForm from 'src/components/form/AuthForm.vue'
import FormError from 'src/components/form/FormError.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import HeaderComp from 'src/components/layout/HeaderComp.vue'
import FormLabel from 'src/components/form/FormLabel.vue'
import RenderlessComp from 'src/components/layout/RenderlessComp.vue'
import BaseIcon from 'src/icons/BaseIcon.vue'
import CloseIcon from 'src/icons/CloseIcon.vue'
import FormSelect from 'src/components/form/FormSelect.vue'
import ModalComp from 'src/components/layout/ModalComp.vue'
import OverlayComp from 'src/components/layout/OverlayComp.vue'
import { PropType, ref } from 'vue'
import { ElementType } from 'src/utils/types'
import { renderValidationErrors } from 'src/utils/helpers'
import { InputType } from 'src/utils/types'
import { employeeFormSchema } from 'src/validation/employeeFormSchema'

const emits = defineEmits(['close-modal', 'submit-event'])
const props = defineProps({
  singleElement: {
    type: Object as PropType<ElementType>,
    required: true,
  },
  inputs: {
    type: Array as PropType<InputType[]>,
    required: true,
  },
})

const element = ref<ElementType>({ ...props.singleElement })

const formErrors = ref<Record<string, string>>({})

const closeModal = () => {
  emits('close-modal')
}

const setTrainingCompleted = (value: boolean) => {
  if ('trainingCompleted' in element.value) {
    element.value.trainingCompleted = value
  }
}

const submitForm = async () => {
  const validation = employeeFormSchema.safeParse(element.value)
  if (validation.success) {
    emits('submit-event', element.value)
  } else {
    const updatedErorrs = renderValidationErrors(validation.error.errors)
    formErrors.value = updatedErorrs
  }
}
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.authForm {
  margin: 0 auto;

  &__label {
    font-size: $medium-font;
  }

  &__select {
    border: 1px solid $dark-color;
    width: 100%;
  }

  &__checkbox {
    position: absolute;
    top: 50%;
    right: 3%;
    transform: translateY(-50%);
  }

  /* &-date {
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        border-left: none;
        border-radius: 0;
      } */
}
</style>
