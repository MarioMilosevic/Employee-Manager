import { defineStore } from 'pinia'
import { UserType } from 'src/utils/types'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<UserType | null>(null)

  function setUser(newUser: UserType) {
    user.value = newUser
  }

  return {
    user,
    setUser,
  }
})
