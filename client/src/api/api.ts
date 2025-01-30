import { EmployeeType, LoginCredentialsType, UserType } from 'src/utils/types'
import { baseUrl } from 'src/utils/constants'
import { getDataFromJson } from 'src/utils/helpers'


export const postData = async (postData: EmployeeType | UserType, path: string) => {
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
  } catch (error) {
    console.error('Network error', error)
  }
}

export const editData = async (data: EmployeeType| UserType, path: string) => {
  try {
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

export const deleteData = async (path: string, id: number) => {
  try {
    const response = await fetch(`${baseUrl}/${path}/${id}`, {
      method: 'DELETE',
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const login = async (data: LoginCredentialsType) => {
  try {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return getDataFromJson(response)
  } catch (error) {
    console.error(error)
  }
}

export const getUserData = async (token:string) => {
try {
  const response = await fetch(`${baseUrl}/login`, {
    headers: {
      Authorization:`Bearer ${token}`
    }
  })
  console.log('ovo je reponse', response)
} catch (error) {
console.error(error)
}
}