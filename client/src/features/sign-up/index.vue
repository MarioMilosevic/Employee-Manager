<template>
  <AuthForm @submit.prevent="submitForm">
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
        <!-- <template #error>
          <FormError>{{ formErrors.firstName }}</FormError>
        </template> -->
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
        <!-- <template #error>
          <FormError>{{ formErrors.firstName }}</FormError>
        </template> -->
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
        <!-- <template #error>
          <FormError>{{ formErrors.firstName }}</FormError>
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
            :value="signUpCredentials.password"
            @update-value="updateLoginCredentials"
          />
        </template>
        <!-- <template #error>
          <FormError>{{ formErrors.firstName }}</FormError>
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
            :value="signUpCredentials.confirm"
            @update-value="updateLoginCredentials"
          />
        </template>
        <!-- <template #error>
          <FormError>{{ formErrors.firstName }}</FormError>
        </template> -->
      </FormBlock>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import FormBlock from 'src/components/form/FormBlock.vue'
import FormInput from 'src/components/form/FormInput.vue'
import FormError from 'src/components/form/FormError.vue'
import AuthForm from 'src/components/form/AuthForm.vue'
import { ref } from 'vue'

const signUpCredentials = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm: '',
})

const updateLoginCredentials = () => {
  console.log('radi')
}

const submitForm = () => {
  console.log('submit ')
}
</script>

<style lang="scss" scoped>
@use 'src/scss/_variables' as *;
/*

.form {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: $medium;
  background-color: $primary-shade-color;
  background-color: $secondary-color;
  padding: $big;
  margin: 0 auto;

} */
</style>
