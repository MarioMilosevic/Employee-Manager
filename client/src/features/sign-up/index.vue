<template>
  <AuthForm @submit.prevent="submitForm" :inputs="signUpInputs">
    <template #title>
      <TitleName :style="{ color: '#0b050f', paddingBottom: '3rem' }">Sign Up</TitleName>
    </template>
    <template v-for="input in signUpInputs" :key="input.id" #[input.name]>
      <FormInput
        :type="input.type"
        :placeholder="input.placeholder"
        v-model="signUpCredentials[input.name as keyof typeof signUpCredentials]"
      />
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
// import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
// import FormError from 'src/components/form/FormError.vue'
import { signUpInputs } from 'src/utils/constants'
import TitleName from 'src/components/layout/TitleName.vue'
import AuthForm from 'src/components/form/AuthForm.vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import { postData } from 'src/api/api'
// import { renderValidationErrors } from 'src/utils/helpers'
// import { signUpSchema } from 'src/validation/signUpSchema'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { SignUpCredentialsType } from 'src/utils/types'
import { compareObjectFieldChange } from 'src/utils/helpers'

const signUpCredentials = ref<SignUpCredentialsType>({
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

watch(
  () => ({ ...signUpCredentials.value }),
  (newValue, oldValue) => {
    const hasFieldChanged = compareObjectFieldChange(newValue, oldValue)
    if (signUpFormError.value !== '' && hasFieldChanged) {
      signUpFormError.value = ''
    }
  },
)

const submitForm = async () => {
  try {
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
