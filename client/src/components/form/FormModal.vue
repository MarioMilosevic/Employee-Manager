<template>
  <div v-if="isModalOpen" class="overlay">
    <div class="overlay__modal">
      <h2 class="overlay__modal-title">Edit Employee </h2>
      <button @click="closeModal" class="overlay__modal-button">X</button>
      <EmployeeForm class="overlay__modal-form">
        <template #firstName>
          <FormBlock>
            <template #input>
              <FormInput
                dataName="firstName"
                type="text"
                placeholder="First Name"
                :value="employee.firstName"
                @update-value="updateFormState"
              />
            </template>
            <template #error>
              <FormError>{{ firstName }}</FormError>
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
                :value="employee.lastName"
                @update-value="updateFormState"
              />
            </template>
            <template #error>
              <FormError>{{ lastName }}</FormError>
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
                :value="employee.address"
                @update-value="updateFormState"
              />
            </template>
            <template #error>
              <FormError>{{ address }}</FormError>
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
                :value="employee.startYear"
                @update-value="updateFormState"
              />
            </template>
            <template #error>
              <FormError>{{ startYear }}</FormError>
            </template>
          </FormBlock>
        </template>
        <template #trainingCompleted>
          <div class="checkbox">
            <label for="training">Training Completed ?</label>
            <input
              dataName="trainingCompleted"
              id="training"
              type="checkbox"
              :checked="employee.trainingCompleted"
              v-model="employee.trainingCompleted"
              @input="!employee.trainingCompleted"
            />
          </div>
        </template>
        <template #submit>
          <ActionButton color="white" type="submit" :style="{ justifySelf: 'start' }">
            Submit
          </ActionButton>
        </template>
      </EmployeeForm>
    </div>
  </div>
</template>

<script lang="ts">
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import EmployeeForm from 'src/components/form/EmployeeForm.vue'
import FormError from 'src/components/form/FormError.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { PropType, watch, ref, reactive, toRefs } from 'vue'
import { EmployeeType } from 'src/utils/types'

export default {
  setup(props, { emit }) {
    const employee = ref({ ...props.singleEmployee })

      const formErrors = reactive({
      firstName: '',
      lastName: '',
      address: '',
      startYear: '',
    })


    const closeModal = () => {
      emit('close-modal')
    }

    const updateFormState = (key: keyof typeof employee, value: string) => {
      employee[key] = value as never
    }

    watch(
      () => props.singleEmployee,
      (newEmployee) => {
        employee.value = newEmployee
      },
      { deep: true },
    )

    return {
      closeModal,
      employee,
      updateFormState,
      ...toRefs(formErrors)
    }
  },
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    singleEmployee: {
      type: Object as PropType<EmployeeType>,
      required: true,
    },
  },
  emits: ['close-modal'],
  components: {
    FormBlock,
    EmployeeForm,
    FormError,
    ActionButton,
    FormInput,
  },
}
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;

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
    padding: $big;
    display: flex;
    flex-direction: column;
    gap: $medium;


    &-button {
      position: absolute;
      top: 7%;
      right: 2%;
      border: none;
      cursor: pointer;
      background-color: $dark-color;
      color: $secondary-color;
      padding: 0.2rem 0.3rem;
    }

    &-form {
      display: flex;
      gap: $big;
      align-items: center;
      background-color: $primary-shade-color;
      padding: $medium;
      border-radius: $small-radius;
    }
  }
}
</style>
