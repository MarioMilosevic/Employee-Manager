import { ref } from 'vue'
import { getData } from 'src/api/api'

export const useFetchData = async (dataPath: string, tablePath: string, inputsPath: string) => {
  // const loading = ref<boolean>(true)
  const data = ref([])
  const tableData = ref()
  const inputsData = ref()

  const [dataResponse, tableResponse, inputsResponse] = await Promise.all([
    getData(dataPath),
    getData(tablePath),
    getData(inputsPath),
  ])
  //  getData('users/all'),
  //  getData('table/dashboard'),
  //  getData('inputs/admin'),

  data.value = dataResponse.data
  tableData.value = tableResponse.data
  inputsData.value = inputsResponse.data

  return {
    data,
    tableData,
    inputsData,
  }
}
