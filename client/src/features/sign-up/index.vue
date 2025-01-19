<template>
  <AuthForm @submit.prevent="submitForm">
    <template #title>
      <TitleName :style="{ color: '#0b050f', paddingBottom: '3rem' }">Sign Up</TitleName>
    </template>
    <template #firstName>
      <FormBlock>
        <template #input>
          <FormInput type="text" placeholder="First Name" v-model="signUpCredentials.firstName" />
        </template>
        <!-- <template #error>
          <FormError>{{ signUpFormErrors.firstName }}</FormError>
        </template> -->
      </FormBlock>
    </template>
    <template #lastName>
      <FormBlock>
        <template #input>
          <FormInput type="text" placeholder="Last Name" v-model="signUpCredentials.lastName" />
        </template>
        <!-- <template #error>
          <FormError>{{ signUpFormErrors.lastName }}</FormError>
        </template> -->
      </FormBlock>
    </template>
    <template #email>
      <FormBlock>
        <template #input>
          <FormInput type="email" placeholder="Email" v-model="signUpCredentials.email" />
        </template>
        <!-- <template #error>
          <FormError>{{ signUpFormErrors.email }}</FormError>
        </template> -->
      </FormBlock>
    </template>
    <template #password>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="password"
            type="password"
            placeholder="Password"
            v-model="signUpCredentials.password"
          />
        </template>
        <!-- <template #error>
          <FormError>{{ signUpFormErrors.password }}</FormError>
        </template> -->
      </FormBlock>
    </template>
    <template #confirmPassword>
      <FormBlock>
        <template #input>
          <FormInput
            dataName="confirm"
            type="password"
            placeholder="Confirm Password"
            v-model="signUpCredentials.passwordConfirm"
          />
        </template>
        <template #error>
          <FormError>{{ signUpFormError }}</FormError>
        </template>
      </FormBlock>
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
import TitleName from 'src/components/layout/TitleName.vue'
import AuthForm from 'src/components/form/AuthForm.vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { postData } from 'src/api/api'
// import { renderValidationErrors } from 'src/utils/helpers'
// import { signUpSchema } from 'src/validation/signUpSchema'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const signUpCredentials = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const signUpFormError = ref('')
// const signUpFormErrors = ref({
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
//   confirm: '',
// })

const router = useRouter()

const submitForm = async () => {
  try {
    console.log(signUpCredentials.value);
    const response = await postData(signUpCredentials.value, 'users/sign-up')
    console.log(response)
    if (response.data) {
        router.push('/login')
    } else {
      signUpFormError.value = response.message
    }
    // const validation = signUpSchema.safeParse(signUpCredentials.value)
    // console.log(validation)
    // if (validation.success) {
    //   const { confirm, ...userData } = validation.data
    //   const response = await postData(userData, `users/sign-up`)
    //   console.log('sta vrati server', response)
    //   if (response.id) {
    //     router.push('/login')
    //   }
    // } else {
    //   // sa bekenda
    //   const updatedErorrs = renderValidationErrors(signUpFormErrors, validation.error.errors)
    //   signUpFormErrors.value = updatedErorrs
    //   console.log('erorri', updatedErorrs)
    //   console.log('formErrrori', signUpFormErrors.value)
    // }
  } catch (error) {
    console.error(error)
  }
}
</script>
