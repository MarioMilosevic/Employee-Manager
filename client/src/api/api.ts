import { LoginCredentialsType, UserType, ElementType } from 'src/utils/types'
import { baseUrl } from 'src/utils/constants'
import { getDataFromJson, formatDate } from 'src/utils/helpers'
import { Router } from 'vue-router'
import { showToast } from 'src/utils/toast'

export const postData = async (postData: ElementType, path: string) => {
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

export const editData = async (data: ElementType, path: string) => {
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
    console.error(error)
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

export const getUserData = async (token: string) => {
  try {
    const response = await fetch(`${baseUrl}/users/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return getDataFromJson(response)
  } catch (error) {
    console.error(error)
  }
}

export const signInAnonymously = async () => {
  try {
    const date = new Date()
    const guest = {
      role: 'GUEST',
      fullName: 'Guest',
      email: `guest${Date.now()}@gmail.com`,
      password: '12345678',
      createdDate: formatDate(date),
    }

    const response = await fetch(`${baseUrl}/users/login/guest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guest),
    })
    return getDataFromJson(response)
  } catch (error) {
    console.error(error)
  }
}

export const signOut = async (router: Router, user: UserType) => {
  router.push('/login')
  localStorage.removeItem('login-token')
  const firstName = user.fullName.split(' ')[0]
  setTimeout(() => {
    showToast(`${firstName} signed out`)
  }, 500)
  if (user.role === 'GUEST' && user.id) {
    try {
      await deleteData('users', user.id)
    } catch (error) {
      console.error(error)
    }
  }
}
