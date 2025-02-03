<template>
  <LoadingSpinner v-if="loading" />
  <AuthForm @submit.prevent="submitForm" v-else>
    <template #title>
      <TitleName color="black" align="center">Sign Up</TitleName>
    </template>
    <template #inputs>
      <FormInputs>
        <template v-for="input in signUpInputs" :key="input.id" #[input.name]>
          <FormBlock>
            <template #input>
              <FormInput
                v-bind="input"
                v-model="signUpCredentials[input.name as keyof typeof signUpCredentials]"
              />
            </template>
            <template #error>
              <FormError>{{
                signUpFormErrors[input.name as keyof typeof signUpFormErrors]
              }}</FormError>
            </template>
          </FormBlock>
        </template>
      </FormInputs>
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
import { emptySignUpObj } from 'src/utils/constants'
import TitleName from 'src/components/layout/TitleName.vue'
import AuthForm from 'src/components/form/AuthForm.vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import { postData, getData } from 'src/api/api'
import { renderValidationErrors } from 'src/utils/helpers'
import { signUpSchema } from 'src/validation/signUpSchema'
import { useRouter } from 'vue-router'
import { ref, onBeforeMount } from 'vue'
import { SignUpCredentialsType, UserType } from 'src/utils/types'
import { showToast } from 'src/utils/toast'
import FormInputs from 'src/components/form/FormInputs.vue'

onBeforeMount(async () => {
  const { data } = await getData('inputs/signUp')
  signUpInputs.value = data
  loading.value = false
})

const signUpCredentials = ref<SignUpCredentialsType>({ ...emptySignUpObj })
const signUpFormErrors = ref<SignUpCredentialsType>({ ...emptySignUpObj })
const signUpInputs = ref()
const loading = ref(true)

const router = useRouter()

const submitForm = async () => {
  try {
    const validation = signUpSchema.safeParse(signUpCredentials.value)
    if (validation.success) {
      signUpFormErrors.value = { ...emptySignUpObj }
      const response = await postData(signUpCredentials.value as UserType, `users/sign-up`)
      if (response.data) {
        router.push('/login')
        setTimeout(() => {
          showToast('User Created')
        }, 1000)
      } else {
        showToast(`${response.message}`, 'error')
      }
    } else {
      const updatedErorrs = renderValidationErrors(
        signUpFormErrors,
        validation.error.errors,
      ) as SignUpCredentialsType
      signUpFormErrors.value = updatedErorrs
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
