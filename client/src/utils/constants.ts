import { EmployeeErrorsType } from './types'

export const baseUrl = 'http://localhost:3000/api/v1'

export const emptySingleEmployee = {
  firstName: '',
  lastName: '',
  address: '',
  startYear: '',
  trainingCompleted: false,
}


// export type UserType = {
//   id?: number
//   firstName: string
//   lastName: string
//   email: string
//   password: string
//   passwordConfirm: string
//   role: string
// }

export const emptySingleUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  role:""
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
