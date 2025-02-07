import { ref, onBeforeMount } from 'vue'
import { getData } from 'src/api/api'

export const useFetchSideData = (path: string) => {
  const data = ref()
  const loading = ref<boolean>(true)

  onBeforeMount(async () => {
    try {
      const dataResponse = await getData(path)
      data.value = dataResponse.data
      loading.value = false
    } catch (error) {
      console.error(error)
    }
  })

  return {
    data,
    loading,
  }
}
