import { EmployeeErrorsType } from './types'

export const baseUrl = 'http://localhost:3000/api/v1'

export const emptySingleEmployee = {
  firstName: '',
  lastName: '',
  address: '',
  startYear: '',
  trainingCompleted: false,
}

export const emptyEmployeeErrors: EmployeeErrorsType = {
  firstName: '',
  lastName: '',
  address: '',
  startYear: '',
}

export const passwordMessage = { message: 'Password must be at least 8 characters' }

export const emptySignUpObj = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  role: 'USER',
}

export const emptyLoginObj = {
  email: '',
  password: '',
}
