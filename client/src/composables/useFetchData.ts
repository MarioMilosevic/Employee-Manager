import { ref, onBeforeMount } from 'vue'
import { getData } from 'src/api/api'
import { ElementType } from 'src/utils/types'


export const useFetchData = (dataPath: string) => {
  const data = ref<ElementType[]>([])

  onBeforeMount(async () => {
    try {
      const dataResponse = await getData(dataPath)
      data.value = dataResponse.data
    } catch (error) {
      console.error(error)
    }
  })

  const addMainData = (obj: ElementType) => data.value.push(obj)

  const removeMainData = (id: number) => {
    data.value = data.value.filter((el) => el.id !== id)
  }
  const editMainData = async (obj: ElementType) => {
    data.value = data.value.map((el) => (el.id === obj.id ? obj : el))
  }

  return {
    data,
    addMainData,
    removeMainData,
    editMainData,
  }
}
