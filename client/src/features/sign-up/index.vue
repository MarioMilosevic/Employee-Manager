<template>
  <AuthForm @submit.prevent="submitForm">
    <template #title>
      <TitleName :style="{ color: '#0b050f', paddingBottom: '3rem' }">Sign Up</TitleName>
    </template>
    <template #firstName>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="firstName"
            type="text"
            placeholder="First Name"
            :value="signUpCredentials.firstName"
            @update-value="updateLoginCredentials"
          />
        </template>
        <template #error>
          <FormError>{{ signUpFormErrors.firstName }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #lastName>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="lastName"
            type="text"
            placeholder="Last Name"
            :value="signUpCredentials.lastName"
            @update-value="updateLoginCredentials"
          />
        </template>
        <template #error>
          <FormError>{{ signUpFormErrors.lastName }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #email>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="email"
            type="email"
            placeholder="Email"
            :value="signUpCredentials.email"
            @update-value="updateLoginCredentials"
          />
        </template>
        <template #error>
          <FormError>{{ signUpFormErrors.email }}</FormError>
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
            :value="signUpCredentials.password"
            @update-value="updateLoginCredentials"
          />
        </template>
        <template #error>
          <FormError>{{ signUpFormErrors.password }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #confirmPassword>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="confirm"
            type="password"
            placeholder="Confirm Password"
            :value="signUpCredentials.confirm"
            @update-value="updateLoginCredentials"
          />
        </template>
        <template #error>
          <FormError>{{ signUpFormErrors.confirm }}</FormError>
        </template>
      </FormBlock>
    </template>
    <template #submit>
      <ActionButton type="submit" color="purple">Sign Up</ActionButton>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import FormError from 'src/components/form/FormError.vue'
import TitleName from 'src/components/layout/TitleName.vue'
import AuthForm from 'src/components/form/AuthForm.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { postData } from 'src/api/api'
import { renderValidationErrors } from 'src/utils/helpers'
import { signUpSchema } from 'src/validation/signUpSchema'
import { ref } from 'vue'

const signUpCredentials = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm: '',
})

const signUpFormErrors = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm: '',
})

const updateLoginCredentials = (key: keyof typeof signUpCredentials.value, value: string) => {
  signUpCredentials.value[key] = value
}

const submitForm = async () => {
  try {
    const validation = signUpSchema.safeParse(signUpCredentials.value)
    if (validation.success) {
    const {confirm, ...userData} = validation.data
      const response = await postData(userData, `users`)
      console.log("sta vrati server",response)
    } else {
      const updatedErorrs = renderValidationErrors(signUpFormErrors, validation.error.errors)
      signUpFormErrors.value = updatedErorrs
      console.log("erorri",updatedErorrs)
      console.log("formErrrori",signUpFormErrors.value)
    }
  } catch (error) {
    console.error(error)
  }
}

</script>