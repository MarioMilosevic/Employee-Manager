import { ref, onBeforeMount } from 'vue'
import { getUserData } from 'src/api/api'
import { UserType } from 'src/utils/types'

export const useFetchUser = () => {
  const user = ref<UserType | null>(null)
  const token = localStorage.getItem('login-token')

  onBeforeMount(async () => {
    if (token) {
      const response = await getUserData(token)
      user.value = response.data
    }
  })

  return { user }
}
