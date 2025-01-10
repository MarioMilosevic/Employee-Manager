import { baseUrl } from 'src/utils/constants'
import { UserType } from 'src/utils/types'

export const createNewUser = async (user: UserType) => {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const result = await response.json()
    const { data: employeeData } = result
    return employeeData
  } catch (error) {
    console.error(error)
  }
}
