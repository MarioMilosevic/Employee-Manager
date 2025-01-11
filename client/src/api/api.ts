import { EmployeeType, UserType } from 'src/utils/types'
import { baseUrl } from 'src/utils/constants'
import { getDataFromJson } from 'src/utils/helpers'

type PostType = {
  data: EmployeeType | UserType
}

export const postData = async (postData: PostType, path: string) => {
  console.log('ovo je u post data', postData)
  try {
    const response = await fetch(`${baseUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
    return getDataFromJson(response)
  } catch (error) {
    console.error('Unexpected error occured', error)
  }
}

export const getData = async (path: string) => {
  try {
    const response = await fetch(`${baseUrl}/${path}`)
    return getDataFromJson(response)
    // const result = await response.json()
    // return result.data
  } catch (error) {
    console.error('Network error', error)
  }
}

export const editData = async (data: PostType, path: string) => {
  try {
    // const response = await fetch(`${baseUrl}/employee/${data.id}`, {
    const response = await fetch(`${baseUrl}/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return getDataFromJson(response)
  } catch (error) {
    console.error('Unable to edit data', error)
  }
}

export const deleteData = async (path: string) => {
  const response = await fetch(`${baseUrl}/${path}`, {
    method: 'DELETE',
  })
  return getDataFromJson(response)
}
