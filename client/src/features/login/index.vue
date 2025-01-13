<template>
  <AuthForm @submit.prevent="submitLogin">
    <template #title>
      <TitleName :style="{ color: '#0b050f', paddingBottom: '1rem' }">Login</TitleName>
    </template>
    <template #email>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="email"
            type="email"
            placeholder="Email"
            :value="loginCredentials.email"
            @update-value="updateLoginCredentials"
          />
        </template>
        <template #error>
          <FormError>{{ loginFormErrors.email }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #password>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="password"
            type="password"
            placeholder="Password"
            :value="loginCredentials.password"
            @update-value="updateLoginCredentials"
          />
        </template>
        <template #error>
          <FormError>{{ loginFormErrors.email }}</FormError>
        </template>
      </FormBlock>
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
import { loginSchema } from 'src/validation/loginSchema'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { login } from 'src/api/api'

const loginCredentials = ref({
  email: 'mario@gmail.com',
  password: '12345678',
})

const loginFormErrors = ref({
  email: '',
  password: '',
})

const router = useRouter()

const updateLoginCredentials = (key: keyof typeof loginCredentials.value, value: string) => {
  loginCredentials.value[key] = value
}

const submitLogin = async () => {
  try {
    const validation = loginSchema.safeParse(loginCredentials.value)
    if (!validation.success) {
      return
    }
    const token = await login(validation.data)
    if (token) {
      localStorage.setItem('login-token', token)
      router.push('/')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped lang="scss"></style>
