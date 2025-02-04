<template>
  <LoadingSpinner v-if="loading" />
  <AuthForm @submit.prevent="submitLogin" class="form" v-else>
    <template #title>
      <TitleName color="black" align="center">Login</TitleName>
    </template>
    <template #inputs>
      <FormInputs>
        <template v-for="input in logInInputs" :key="input.id" #[input.name]>
          <FormBlock>
            <template #input>
              <FormInput
                v-bind="input"
                v-model="loginCredentials[input.name as keyof typeof loginCredentials]"
              />
            </template>
            <template #error>
              <FormError>{{ loginFormError[input.name as keyof typeof loginFormError] }}</FormError>
            </template>
          </FormBlock>
        </template>
      </FormInputs>
    </template>
    <template #submit>
      <ActionButton type="submit" color="purple">Login</ActionButton>
    </template>
    <template #text>
      <FormGuest link-text="Sign Up" @guest-event="guestSignIn" />
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from 'src/components/form/AuthForm.vue'
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import FormError from 'src/components/form/FormError.vue'
import TitleName from 'src/components/layout/HeaderComp.vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import FormInputs from 'src/components/form/FormInputs.vue'
import { loginSchema } from 'src/validation/loginSchema'
import { useRouter } from 'vue-router'
import { ref, onBeforeMount } from 'vue'
import { getData, login, signInAnonymously } from 'src/api/api'
import { renderValidationErrors } from 'src/utils/helpers'
import { showToast } from 'src/utils/toast'
import { emptyLoginObj } from 'src/utils/constants'
import { LoginCredentialsType } from 'src/utils/types'

onBeforeMount(async () => {
  const { data } = await getData('inputs/login')
  logInInputs.value = data
  loading.value = false
})

const loginCredentials = ref<LoginCredentialsType>({ ...emptyLoginObj })
const loginFormError = ref<LoginCredentialsType>({ ...emptyLoginObj })
const logInInputs = ref()
const loading = ref(true)

const guestSignIn = async () => {
  const response = await signInAnonymously()
  if (response.data) {
    localStorage.setItem('login-token', response.data)
    router.push('/')
  }
}

const router = useRouter()

const submitLogin = async () => {
  try {
    const validation = loginSchema.safeParse(loginCredentials.value)
    if (validation.success) {
      const response = await login(loginCredentials.value)
      if (response.data) {
        router.push('/')
        localStorage.setItem('login-token', response.data)
      } else {
        showToast(response.message, 'error')
      }
    } else {
      const updatedErorrs = renderValidationErrors(
        loginFormError,
        validation.error.errors,
      ) as LoginCredentialsType
      loginFormError.value = updatedErorrs
    }
  } catch (error) {
    console.error(error)
    showToast(error as string, 'error')
  }
}
</script>
