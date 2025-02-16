<template>
  <LoadingSpinner v-if="loadingStore.loading" />
  <AuthForm @submit.prevent="submitLogin" class="form" v-else>
    <template #title>
      <HeaderComp color="black" align="center">
        <template #title> Login </template>
      </HeaderComp>
    </template>
    <template #inputs>
      <RenderlessComp>
        <template v-for="input in loginInputs" :key="input.id" #[input.name]>
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
      </RenderlessComp>
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
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import RenderlessComp from 'src/components/layout/RenderlessComp.vue'
import { loginSchema } from 'src/validation/loginSchema'
import { useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { getData, login, signInAnonymously } from 'src/api/api'
import { renderValidationErrors } from 'src/utils/helpers'
import { showToast } from 'src/utils/toast'
import { emptyLoginObj } from 'src/utils/constants'
import { LoginCredentialsType } from 'src/utils/types'
import HeaderComp from 'src/components/layout/HeaderComp.vue'
import { useLoadingStore } from 'src/stores/loadingStore'
import { useSortFilterStore } from 'src/stores/sortFIlterOptionsStore'

onBeforeMount(async () => {
  try {
    loadingStore.setLoading(true)
    const { data } = await getData('inputs/login')
    loginInputs.value = data
    loadingStore.setLoading(false)
  } catch (error) {
    console.error(error)
  }
})

const loadingStore = useLoadingStore()
const sortFilterStore = useSortFilterStore()
const loginInputs = ref()
const loginCredentials = ref<LoginCredentialsType>({ ...emptyLoginObj })
const loginFormError = ref<LoginCredentialsType>({ ...emptyLoginObj })

const goToHomePage = () => {
  router.push({
    path: '/',
    query: {
      department: sortFilterStore.sortFilterOptions.department,
      employment: sortFilterStore.sortFilterOptions.employment,
      sort: sortFilterStore.sortFilterOptions.sort,
    },
  })
}

const guestSignIn = async () => {
  const response = await signInAnonymously()
  if (response.data) {
    localStorage.setItem('login-token', response.data)
    goToHomePage()
  } else {
    showToast('Unable to login as guest', 'error')
  }
}

const router = useRouter()

const submitLogin = async () => {
  try {
    const validation = loginSchema.safeParse(loginCredentials.value)
    if (validation.success) {
      const response = await login(loginCredentials.value)
      if (response.data) {
        localStorage.setItem('login-token', response.data)
        goToHomePage()
      } else {
        showToast(response.message, 'error')
      }
    } else {
      const updatedErorrs = renderValidationErrors(validation.error.errors) as LoginCredentialsType
      loginFormError.value = updatedErorrs
    }
  } catch (error) {
    console.error(error)
    showToast(error as string, 'error')
  }
}
</script>
