<template>
  <div class="links">
    <p class="links__text">
      {{ accountText }} have an account?
      <router-link :to="{ name: linkText }" class="wrapper__links-link">
        {{ linkText }}
      </router-link>
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

  &__text {
    color: $dark-color;
  }

  &-link {
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
