import { ref, onBeforeMount } from 'vue'
import { getData } from 'src/api/api'
import { EmployeeType, UserType } from 'src/utils/types'

type MainDataType = EmployeeType | UserType

export const useFetchData = (dataPath: string) => {
  const data = ref<MainDataType[]>([])

  onBeforeMount(async () => {
    const dataResponse = await getData(dataPath)
    data.value = dataResponse.data
  })

  const addMainData = (obj: EmployeeType | UserType) => data.value.push(obj)

  const removeMainData = (id: number) => {
    data.value = data.value.filter((el) => el.id !== id)
  }
  const editMainData = async (obj: EmployeeType | UserType) => {
    data.value = data.value.map((el) => (el.id === obj.id ? obj : el))
  }

  return {
    data,
    addMainData,
    removeMainData,
    editMainData,
  }
}
