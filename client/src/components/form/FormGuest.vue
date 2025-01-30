<template>
  <div class="links">
    <p>
      {{ accountText }} have an account?
      <router-link :to="{ name: linkText }" class="links__link">
        {{ linkText }}
      </router-link>
    </p>
    <p v-if="linkText !== 'Login'">Or,
      <span class="links__link" @click="emits('guest-event')">log in as guest</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  linkText: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['guest-event'])

const accountText = computed(() => {
  return props.linkText === 'Login' ? 'Already' : "Don't"
})
</script>

<style lang="scss" scoped>
@use 'src/scss/abstracts/_variables' as *;

.links {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $dark-color;
  gap: $small;

  &__link {
    text-decoration: none;
    cursor: pointer;
    color: $primary-shade-color;
  }
}
</style>
