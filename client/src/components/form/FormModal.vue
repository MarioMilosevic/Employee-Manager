<template>
  <div v-if="isModalOpen" class="overlay">
    <div class="overlay__modal">
      <h1>Change Employee Information</h1>
      <button @click="closeModal" class="overlay__modal-button">X</button>
      <EmployeeForm class="form">
        <template #firstName>
          <FormBlock>
            <template #input>
              <FormInput
                dataName="firstName"
                type="text"
                placeholder="First Name"
                :value="firstName"
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
                :value="lastName"
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
                :value="address"
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
                :value="startYear"
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
              :checked="trainingCompleted"
              v-model="trainingCompleted"
              @input="!trainingCompleted"
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
import FormInput from 'src/components/form/FormInput.vue';
import EmployeeForm from 'src/components/form/EmployeeForm.vue'
import FormError from 'src/components/form/FormError.vue'
import ActionButton from 'src/components/layout/ActionButton.vue';

export default {
  setup(_, { emit }) {
    const closeModal = () => {
      emit('close-modal')
    }

    return {
      closeModal,
    }
  },
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close-modal'],
  components: {
    FormBlock,
    EmployeeForm,
    FormError,
    ActionButton,
    FormInput
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
    max-width: 600px;
    width: 100%;
    transform: translate(-50%, -50%);
    background-color: $secondary-color;
    padding: $very-big;
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
  }
}
</style>
