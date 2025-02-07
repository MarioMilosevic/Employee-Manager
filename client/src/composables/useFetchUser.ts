import { ref, onBeforeMount } from 'vue'
import { getUserData } from 'src/api/api'
import { UserType } from 'src/utils/types'

export const useFetchUser = () => {
  const user = ref<UserType | null>(null)
  const loading = ref<boolean>(true)
  const token = localStorage.getItem('login-token')

  onBeforeMount(async () => {
    if (token) {
      try {
        const response = await getUserData(token)
        user.value = response.data
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        loading.value = false
      }
    } else {
      loading.value = false
    }
  })

  return { user, loading }
}
