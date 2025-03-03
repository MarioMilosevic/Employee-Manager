<template>
  <LoadingSpinner v-if="loadingStore.loading">
    <template #default>
      <p class="wakeUp">Waking up the server, this may take a few moments...</p>
    </template>
  </LoadingSpinner>
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
                @blur-event="blurHandler(input.name as LoginFields)"
                v-bind="input"
                v-model="loginCredentials[input.name as keyof typeof loginCredentials]"
              />
            </template>
            <template #error>
              <FormError>{{ formErrors[input.name as LoginFields] }}</FormError>
            </template>
          </FormBlock>
        </template>
      </RenderlessComp>
    </template>
    <template #submit>
      <ActionButton type="submit" color="blue">Login</ActionButton>
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
import HeaderComp from 'src/components/layout/HeaderComp.vue'
import {
  getErrors,
  getFieldError,
  LoginFieldErrors,
  LoginFields,
  loginSchema,
  LoginTouchedFields,
} from 'src/validation/loginSchema'
import { useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { getData, login, signInAnonymously } from 'src/api/api'
import { showToast } from 'src/utils/toast'
import { LoginCredentialsType } from 'src/utils/types'
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
const formErrors = ref<LoginFieldErrors>({})
const touchedFields = ref<LoginTouchedFields>({})
const loginCredentials = ref<LoginCredentialsType>({ email: '', password: '' })

const goToHomePage = () => {
  router.push({
    path: '/',
    query: {
      department: sortFilterStore.sortFilterOptions.department.toLowerCase(),
      employment: sortFilterStore.sortFilterOptions.employment.toLowerCase(),
      sort: sortFilterStore.sortFilterOptions.sort.toLowerCase(),
    },
  })
}

const blurHandler = (property: LoginFields) => {
  const message = getFieldError(property, loginCredentials.value[property])
  formErrors.value[property] = message
  touchedFields.value[property] = true
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
    const { error } = loginSchema.safeParse(loginCredentials.value)
    if (error) {
      Object.entries(getErrors(error)).forEach(([key, value]) => {
        formErrors.value[key as LoginFields] = value
      })
    } else {
      const { data, message } = await login(loginCredentials.value)
      if (data) {
        localStorage.setItem('login-token', data)
        goToHomePage()
      } else {
        showToast(message, 'error')
      }
    }
  } catch (error) {
    console.error(error)
    showToast(error as string, 'error')
  }
}
</script>
