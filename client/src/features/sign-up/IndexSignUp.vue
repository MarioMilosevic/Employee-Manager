<template>
  <LoadingSpinner v-if="loadingStore.loading" />
  <AuthForm @submit.prevent="submitForm" v-else>
    <template #title>
      <HeaderComp color="black" align="center">
        <template #title> Sign Up </template>
      </HeaderComp>
    </template>
    <template #inputs>
      <RenderlessComp>
        <template v-for="input in signUpInputs" :key="input.id" #[input.name]>
          <FormBlock>
            <template #input>
              <FormInput
                @blur-event="blurHandler(input.name as SignUpFields)"
                v-bind="input"
                v-model="signUpCredentials[input.name as keyof typeof signUpCredentials]"
              />
            </template>
            <template #error>
              <FormError>{{ formErrors[input.name as SignUpFields] }}</FormError>
            </template>
          </FormBlock>
        </template>
      </RenderlessComp>
    </template>
    <template #submit>
      <ActionButton type="submit" color="blue">Sign Up</ActionButton>
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
import AuthForm from 'src/components/form/AuthForm.vue'
import FormGuest from 'src/components/form/FormGuest.vue'
import ActionButton from 'src/components/layout/ActionButton.vue'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'
import HeaderComp from 'src/components/layout/HeaderComp.vue'
import RenderlessComp from 'src/components/layout/RenderlessComp.vue'
import { emptySignUpObj } from 'src/utils/constants'
import { getData, postData } from 'src/api/api'
import { formatDate } from 'src/utils/helpers'
import {
  SignUpFieldErorrs,
  SignUpFields,
  signUpSchema,
  SignupTouchedFields,
} from 'src/validation/signUpSchema'
import { useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { SignUpCredentialsType } from 'src/utils/types'
import { showToast } from 'src/utils/toast'
import { useLoadingStore } from 'src/stores/loadingStore'
import { getFieldError } from 'src/validation/signUpSchema'

onBeforeMount(async () => {
  try {
    loadingStore.setLoading(true)
    const { data } = await getData('inputs/signUp')
    signUpInputs.value = data
    loadingStore.setLoading(false)
  } catch (error) {
    console.error(error)
  }
})

const loadingStore = useLoadingStore()
const signUpInputs = ref()
const signUpCredentials = ref<SignUpCredentialsType>({ ...emptySignUpObj })
const formErrors = ref<SignUpFieldErorrs>({})
const touchedFields = ref<SignupTouchedFields>({})

const router = useRouter()

const blurHandler = (property: SignUpFields) => {
  const message = getFieldError(property, signUpCredentials.value[property])
  formErrors.value[property] = message
  touchedFields.value[property] = true
}

const submitForm = async () => {
  try {
    const validation = signUpSchema.safeParse(signUpCredentials.value)
    if (validation.success) {
      const date = new Date()
      const createdDate = formatDate(date)
      const newUser = { ...signUpCredentials.value, createdDate }
      const response = await postData(newUser, `users/sign-up`)
      if (response.data) {
        router.push('/login')
        setTimeout(() => {
          showToast('User Created')
        }, 1000)
      } else {
        showToast(`${response.message}`, 'error')
      }
    } else {
      // const updatedErorrs = renderValidationErrors(validation.error.errors)
      // signUpFormErrors.value = updatedErorrs
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
