import { ref, onBeforeMount } from 'vue'
import { getData } from 'src/api/api'

export const useFetchData = (tablePath: string, inputsPath: string) => {
  const tableData = ref()
  const inputsData = ref()
  const loading = ref<boolean>(true)

  onBeforeMount(async () => {
    const [inputsResponse, tableResponse] = await Promise.all([
      getData(tablePath),
      getData(inputsPath),
    ])

    tableData.value = tableResponse.data
    inputsData.value = inputsResponse.data
    loading.value = false
  })

  return {
    tableData,
    inputsData,
    loading,
  }
}
