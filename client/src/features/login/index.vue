<template>
  <AuthForm>
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
      <ActionButton color="purple">Login</ActionButton>
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
import { ref } from 'vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'

const loginCredentials = ref({
  email: '',
  password: '',
})

const loginFormErrors = ref({
  email: '',
  password: '',
})

const updateLoginCredentials = (key: keyof typeof loginCredentials.value, value: string) => {
  loginCredentials.value[key] = value
}
</script>

<style scoped lang="scss"></style>
