import { defineStore } from 'pinia'
import { emptySingleUser } from 'src/utils/constants'
import { UserType } from 'src/utils/types'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<UserType>(emptySingleUser)

  function setUser(newUser: UserType) {
    user.value = newUser
  }

  return {
    user,
    setUser,
  }
})
