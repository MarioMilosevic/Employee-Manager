<template>
  <AuthForm @submit.prevent="submitLogin" :inputs="loginInputs">
    <template #title>
      <TitleName :style="{ color: '#0b050f', paddingBottom: '1rem' }">Login</TitleName>
    </template>
    <template v-for="input in loginInputs" :key="input.id" #[input.name]>
      <FormInput
        :type="input.type"
        :placeholder="input.placeholder"
        v-model="loginCredentials[input.name as keyof typeof loginCredentials]"
      />
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
// import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
// import FormError from 'src/components/form/FormError.vue'
import TitleName from 'src/components/layout/TitleName.vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { loginInputs } from 'src/utils/constants'
// import { loginSchema } from 'src/validation/loginSchema'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { login } from 'src/api/api'
// import { compareObjectFieldChange } from 'src/utils/helpers'
import { showToast } from 'src/utils/toast'

const loginCredentials = ref({
  email: 'mario12@gmail.com',
  password: '12345678',
})

const loginFormError = ref('')

// watch(
//   () => ({ ...loginCredentials.value }),
//   (newValue, oldValue) => {
//     const hasFieldChanged = compareObjectFieldChange(oldValue, newValue)
//     if (loginFormError.value !== '' && hasFieldChanged) {
//       loginFormError.value = ''
//     }
//   },
// )

const router = useRouter()

const submitLogin = async () => {
  try {
    // const validation = loginSchema.safeParse(loginCredentials.value)
    // if (!validation.success) {
    //   return
    // }
    const response = await login(loginCredentials.value)
    if (response.data) {
      localStorage.setItem('login-token', response.data)
      router.push('/')
    } else {
      throw response.message
    }
  } catch (error) {
    console.error(error)
    showToast(error as string, 'error')
  }
}
</script>
