<template>
  <div v-if="isModalOpen" class="overlay">
    <div class="overlay__modal">
      <h2 class="overlay__modal-title">Edit Employee</h2>
      <button @click="closeModal" class="overlay__modal-button">X</button>
      <FormComponent @submit.prevent="submitForm" class="overlay__modal-form">
        <template #firstName>
          <FormBlock>
            <template #input>
              <FormInput type="text" placeholder="First Name" v-model="employee.firstName" />
            </template>
            <!-- <template #error>
              <FormError>{{ firstName }}</FormError>
            </template> -->
          </FormBlock>
        </template>
        <template #lastName>
          <FormBlock>
            <template #input>
              <FormInput type="text" placeholder="Last Name" v-model="employee.lastName" />
            </template>
            <!-- <template #error>
              <FormError>{{ lastName }}</FormError>
            </template> -->
          </FormBlock>
        </template>
        <template #address>
          <FormBlock>
            <template #input>
              <FormInput type="text" placeholder="Address" v-model="employee.address" />
            </template>
            <!-- <template #error>
              <FormError>{{ address }}</FormError>
            </template> -->
          </FormBlock>
        </template>
        <template #startYear>
          <FormBlock>
            <template #input>
              <FormInput type="date" placeholder="Start Year" v-model="employee.startYear" />
            </template>
            <!-- <template #error>
              <FormError>{{ startYear }}</FormError>
            </template> -->
          </FormBlock>
        </template>
        <template #trainingCompleted>
          <FormCheckbox
            :trainingCompleted="employee.trainingCompleted"
            @checkbox-event="editTrainingCompleted"
          />
        </template>
        <template #submit>
          <ActionButton color="white" type="submit" :style="{ justifySelf: 'start' }">
            Submit
          </ActionButton>
        </template>
      </FormComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import FormComponent from 'src/components/form/FormComponent.vue'
// import FormError from 'src/components/form/FormError.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import FormCheckbox from 'src/components/form/FormCheckbox.vue'
import { employeeFormSchema } from 'src/validation/employeeFormSchema'
import { PropType, watch, ref} from 'vue'
import { EmployeeType } from 'src/utils/types'
import { editData } from 'src/api/api'

const emits = defineEmits(['close-modal', 'update-event'])
const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
  },
  singleEmployee: {
    type: Object as PropType<EmployeeType>,
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

const editTrainingCompleted = (value: boolean) => {
  employee.value.trainingCompleted = value
}

// const updateFormState = <K extends keyof typeof employee.value>(
//   key: K,
//   value: (typeof employee.value)[K],
// ) => {
//   employee.value[key] = value
// }
const submitForm = async () => {
  const validation = employeeFormSchema.safeParse(employee.value)
  if (validation.success) {
    const validationData = {
      id: employee.value.id,
      ...validation.data,
    }

    const response = await editData(validationData, `employee/${employee.value.id}`)
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

watch(
  () => props.singleEmployee,
  (newEmployee) => {
    employee.value = newEmployee
  },
  { deep: true },
)
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
