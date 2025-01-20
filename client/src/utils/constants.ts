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
    id:1,
    type: 'email',
    placeholder: 'Email',
  },
  {
    id:2,
    type: 'password',
    placeholder: 'Password',
  },
]

// {
//       type:email,
//       placeholder:Email,

//       }
