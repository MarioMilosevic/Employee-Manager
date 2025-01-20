<template>
  <AuthForm @submit.prevent="submitLogin" :inputs="loginInputs">
    <template #title>
      <TitleName :style="{ color: '#0b050f', paddingBottom: '1rem' }">Login</TitleName>
    </template>
    <template v-for="input in loginInputs" :key="input.id" #[input.type]>
      <FormBlock>
        <template #input>
          <FormInput
            :type="input.type"
            :placeholder="input.placeholder"
            v-model="loginCredentials[input.type]"
          />
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
  <!-- <AuthForm @submit.prevent="submitLogin">
    <template #title>
      <TitleName :style="{ color: '#0b050f', paddingBottom: '1rem' }">Login</TitleName>
    </template>
    <template #email>
      <FormBlock>
        <template #input>
          <FormInput type="email" placeholder="Email" v-model="loginCredentials.email" />

        </template>
      </FormBlock>
    </template>
    <template #password>
      <FormBlock>
        <template #input>
          <FormInput type="password" placeholder="Password" v-model="loginCredentials.password" />
        </template>
        <template #error>
          <FormError>{{ loginFormError }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #submit>
      <ActionButton type="submit" color="purple">Login</ActionButton>
    </template>
    <template #text>
      <FormGuest link-text="Sign Up" />
    </template>
  </AuthForm> -->
</template>

<script setup lang="ts">
import AuthForm from 'src/components/form/AuthForm.vue'
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
// import FormError from 'src/components/form/FormError.vue'
import TitleName from 'src/components/layout/TitleName.vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { loginInputs } from 'src/utils/constants'
// import { loginSchema } from 'src/validation/loginSchema'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { login } from 'src/api/api'
import { compareObjectFieldChange } from 'src/utils/helpers'

const loginCredentials = ref({
  email: 'mario12@gmail.com',
  password: '12345678',
})

const loginFormError = ref('')

watch(
  () => ({ ...loginCredentials.value }),
  (newValue, oldValue) => {
    const hasFieldChanged = compareObjectFieldChange(oldValue, newValue)
    if (loginFormError.value !== '' && hasFieldChanged) {
      loginFormError.value = ''
    }
  },
)

const router = useRouter()

const submitLogin = async () => {
  try {
    // const validation = loginSchema.safeParse(loginCredentials.value)
    // if (!validation.success) {
    //   return
    // }
    // const token = await login(validation.data)
    const response = await login(loginCredentials.value)
    if (response.data) {
      localStorage.setItem('login-token', response.data)
      router.push('/')
    } else {
      loginFormError.value = response.message
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
