<template>
  <LoadingSpinner v-if="loading" />
  <AuthForm @submit.prevent="submitForm" :inputs="signUpInputs" v-else>
    <template #title>
      <TitleName color="black" align="center">Sign Up</TitleName>
    </template>
    <template v-for="input in signUpInputs" :key="input.id" #[input.name]>
      <FormBlock>
        <template #input>
          <FormInput
            v-bind="input"
            v-model="signUpCredentials[input.name as keyof typeof signUpCredentials]"
          />
        </template>
        <template #error>
          <FormError>{{ signUpFormErrors[input.name as keyof typeof signUpCredentials] }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #submit>
      <ActionButton type="submit" color="purple">Sign Up</ActionButton>
    </template>
    <template #text>
      <FormGuest link-text="Login" />
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import FormError from 'src/components/form/FormError.vue'
import { emptySignUpObject } from 'src/utils/constants'
import TitleName from 'src/components/layout/TitleName.vue'
import AuthForm from 'src/components/form/AuthForm.vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import { postData, getData } from 'src/api/api'
import { renderValidationErrors } from 'src/utils/helpers'
import { signUpSchema } from 'src/validation/signUpSchema'
import { useRouter } from 'vue-router'
import { ref, watch, onBeforeMount, computed, nextTick } from 'vue'
import { SignUpCredentialsType, UserType } from 'src/utils/types'
import { compareObjectFieldChange } from 'src/utils/helpers'
import { showToast } from 'src/utils/toast'

onBeforeMount(async () => {
  const { data } = await getData('inputs/signUp')
  signUpInputs.value = data
  loading.value = false
})

const signUpCredentials = ref<SignUpCredentialsType>({ ...emptySignUpObject })
// const signUpCredentials = ref<SignUpCredentialsType>({
//   firstName: "Mario",
//   lastName: "Milosevic",
//   email: "mariomilosevic887@gmail.com",
//   password: "11111111",
//   passwordConfirm: "11111111",
//   role:"user"
// })
const signUpFormErrors = ref<SignUpCredentialsType>({ ...emptySignUpObject })
const signUpInputs = ref()
const loading = ref(true)

const router = useRouter()

// watch(
//   () => ({ ...signUpCredentials.value }),
//   (newValue, oldValue) => {
//     console.log('provjerava')
//     const hasFieldChanged = compareObjectFieldChange(newValue, oldValue)
//     if (signUpFormErrors.value !== '' && hasFieldChanged) {
//       signUpFormErrors.value = ''
//     }
//   },
// )

const submitForm = async () => {
  try {
    const validation = signUpSchema.safeParse(signUpCredentials.value)
    if (validation.success) {
      console.log('uspjesno')
      signUpFormErrors.value = { ...emptySignUpObject }
      console.log(validation)
      const response = await postData(signUpCredentials.value as UserType, `users/sign-up`)
      console.log(response)
      if (response.data) {
        router.push("/login")
        setTimeout(() => {
          showToast('User Created')
        }, 1000);
      } else {
        showToast(`${response.message}`, 'error')
      }
    } else {
      const updatedErorrs = renderValidationErrors(signUpFormErrors, validation.error.errors)
      console.log(updatedErorrs)
      console.log(signUpFormErrors.value)
      signUpFormErrors.value = updatedErorrs
      console.log(signUpFormErrors.value)
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped lang="scss">
@use 'src/scss/abstracts/_variables' as *;

.form {
  display: flex;
  flex-direction: column;
  gap: $medium;
  background-color: $primary-shade-color;
  background-color: $secondary-color;
  padding: $big $very-big;
  max-width: $max-form-width;
  width: 100%;
  margin: 5rem auto;
  border-radius: $medium-radius;
}
</style>
