import { EmployeeType } from './utils/types'
import { baseUrl } from './utils/constants'

export const postData = async (data: EmployeeType) => {
  const response = await fetch(`${baseUrl}/employee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  const {employee} = result
  return employee
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
