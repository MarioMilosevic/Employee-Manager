import { EmployeeErrorsType } from './types'

export const baseUrl = 'http://localhost:3000/api/v1'

export const emptyEmployeeErrors: EmployeeErrorsType = {
  firstName: '',
  lastName: '',
  address: '',
  startYear: '',
}

export const passwordMessage = { message: 'Password must be at least 8 characters' }

export const loginInputs = [
  {
    id: 1,
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
]

export const signUpInputs = [
  {
    id: 1,
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
  },
  {
    id: 2,
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
  },
  {
    id: 3,
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    id: 4,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
  {
    id: 5,
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Pssword',
  },
]
