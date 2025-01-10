import { EmployeeType } from 'src/utils/types'
import { baseUrl } from 'src/utils/constants'

export const postData = async (data: EmployeeType) => {
  try {
    const response = await fetch(`${baseUrl}/employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    const { data: employeeData } = result
    return employeeData
  } catch (error) {
    console.error(error)
  }
}

export const getEmployees = async () => {
  try {
    const response = await fetch(`${baseUrl}/employee`)
    const result = await response.json()
    return result.data
  } catch (error) {
    console.error('Network error', error)
  }
}

export const editData = async (data: EmployeeType) => {
  try {
    const response = await fetch(`${baseUrl}/employee/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    const { data: employeeData } = result
    return employeeData
  } catch (error) {
    console.error('Unable to edit data', error)
  }
}

export const deleteData = async (id: string) => {
  const response = await fetch(`${baseUrl}/employee/${id}`, {
    method: 'DELETE',
  })
  const { data } = await response.json()
  return data
}
