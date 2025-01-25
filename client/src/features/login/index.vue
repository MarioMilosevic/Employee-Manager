<template>
  <LoadingSpinner v-if="loading"/>
  <AuthForm @submit.prevent="submitLogin" :inputs="loginInputs" class="form" v-else>
    <template #title>
      <TitleName :style="{ color: '#0b050f', paddingBottom: '1rem' }">Login</TitleName>
    </template>
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
      <!-- <FormInput
        :type="input.type"
        :placeholder="input.placeholder"
        v-model="loginCredentials[input.name as keyof typeof loginCredentials]"
      /> -->
    </template>
    <template #submit>
      <ActionButton type="submit" color="purple">Login</ActionButton>
    </template>
    <template #text>
      <FormGuest link-text="Sign Up" />
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from 'src/components/form/AuthForm.vue'
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import FormError from 'src/components/form/FormError.vue'
import TitleName from 'src/components/layout/TitleName.vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import { loginSchema } from 'src/validation/loginSchema'
import { useRouter } from 'vue-router'
import { ref, watch, onBeforeMount } from 'vue'
import { getData, login } from 'src/api/api'
import { compareObjectFieldChange, renderValidationErrors } from 'src/utils/helpers'
import { showToast } from 'src/utils/toast'

onBeforeMount(async () => {
  const { data } = await getData('inputs/login')
  loginInputs.value = data
  loading.value = false
})

const loginCredentials = ref({})
const loginFormError = ref({})
const loginInputs = ref()
const loading = ref(true)

// const mario = computed(() =>  {
//   return 'nesto'
// })

watch(
  () => ({ ...loginCredentials.value }),
  (newValue, oldValue) => {
    const hasFieldChanged = compareObjectFieldChange(oldValue, newValue)
    if ((loginFormError.value.email !== '' || loginFormError.value.password) && hasFieldChanged) {
      loginFormError.value = ''
    }
  },
)

const router = useRouter()

const submitLogin = async () => {
  try {
    const validation = loginSchema.safeParse(loginCredentials.value)
    console.log(validation)
    if (validation.success) {
      console.log('dobra')
      const response = await login(loginCredentials.value)
      localStorage.setItem('login-token', response.data)
      router.push('/')
    } else {
      const updatedErorrs = renderValidationErrors(loginFormError, validation.error.errors)
      console.log(updatedErorrs)
      console.log(loginFormError.value)
      loginFormError.value = updatedErorrs
      console.log(loginFormError.value)
    }
    // console.log('erorri', updatedErorrs)
    // console.log('formErrrori', loginFormError.value)
    // const response = await login(loginCredentials.value)
    // if (response.data) {
    //   localStorage.setItem('login-token', response.data)
    //   router.push('/')
    // } else {
    //   throw response.message
    // }
  } catch (error) {
    console.error(error)
    showToast(error as string, 'error')
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
  width: 400px;
  margin: 5rem auto;
  border-radius: $medium-radius;
}
</style>
