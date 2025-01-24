<template>
  <AuthForm @submit.prevent="submitForm" :inputs="signUpInputs">
    <template #title>
      <TitleName :style="{ color: '#0b050f', paddingBottom: '3rem' }">Sign Up</TitleName>
    </template>
     <template v-for="input in Object.keys(signUpCredentials)" :key="input" #[input]>
       <FormBlock>
         <template #input>
           <FormInput
             v-bind="input"
             v-model="signUpCredentials[input as keyof typeof signUpCredentials]"
           />
         </template>
         <template #error>
           <FormError>{{
             signUpFormErrors[input as keyof typeof signUpCredentials]
           }}</FormError>
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
import { emptySignUpObject } from 'src/utils/constants'
import TitleName from 'src/components/layout/TitleName.vue'
import AuthForm from 'src/components/form/AuthForm.vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { postData, getData } from 'src/api/api'
import { renderValidationErrors } from 'src/utils/helpers'
import { signUpInputs } from 'src/utils/constants'
import { signUpSchema } from 'src/validation/signUpSchema'
import { useRouter } from 'vue-router'
import { ref, watch, onBeforeMount, computed } from 'vue'
import { SignUpCredentialsType } from 'src/utils/types'
// import { compareObjectFieldChange } from 'src/utils/helpers'
// import { showToast } from 'src/utils/toast'

onBeforeMount(async () => {
  const { data } = await getData('users/sign-up')
  console.log(data)
  console.log(Object.keys(data))
  signUpCredentials.value = data
  console.log(Object.keys(signUpCredentials.value))
  signUpFormErrors.value = data
})

const signUpCredentials = ref<SignUpCredentialsType>(emptySignUpObject)
const signUpFormErrors = ref<SignUpCredentialsType>(emptySignUpObject)


const router = useRouter()

// watch(
//   () => ({ ...signUpCredentials.value }),
//   (newValue, oldValue) => {
//     const hasFieldChanged = compareObjectFieldChange(newValue, oldValue)
//     if (signUpFormError.value !== '' && hasFieldChanged) {
//       signUpFormError.value = ''
//     }
//   },
// )

const submitForm = async () => {
  try {
    const validation = signUpSchema.safeParse(signUpCredentials.value)
    console.log(validation)
    if (validation.success) {
      // onda radim logiku za sign up
    } else {
      const updatedErorrs = renderValidationErrors(signUpFormErrors, validation.error.errors)
      console.log(updatedErorrs)
      console.log(signUpFormErrors.value)
      signUpFormErrors.value = updatedErorrs
      console.log(signUpFormErrors.value)
      // console.log('erorri', updatedErorrs)
      // console.log('formErrrori', signUpFormErrors.value)
    }

    // const response = await postData(signUpCredentials.value, 'users/sign-up')
    // console.log(response)
    // if (response.data) {
    //   router.push('/login')
    // } else {
    //   showToast(response.message, 'error')
    //   signUpFormError.value = response.message
    // }

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

<style scoped lang="scss">
@use 'src/scss/_variables' as *;

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
