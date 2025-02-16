import { EmployeeType, SignUpCredentialsType, UserType } from './types'

export const baseUrl = 'http://localhost:3000/api/v1'

export const emptySingleEmployee: EmployeeType = {
  fullName: '',
  address: '',
  startYear: "",
  department: 'Engineering',
  employment: 'Full',
  trainingCompleted: false,
}

export const emptySingleUser: UserType = {
  fullName: '',
  email: '',
  role: '',
  createdDate: null,
}

export const passwordMessage = { message: 'Password must be at least 8 characters' }

export const emptySignUpObj: SignUpCredentialsType = {
  fullName: '',
  email: '@gmail.com',
  password: '11111111',
  passwordConfirm: '11111111',
  role: 'USER',
  createdDate: null,
}

export const emptyLoginObj = {
  email: '',
  password: '',
}

export const departmentOptions = ['Department', 'All', 'Engineering', 'HR', 'Sales']

export const employmentOptions = ['Employment', 'All', 'Contractor', 'Full', 'Part']

export const userRoles = ['Role', 'All', 'Admin', 'User', 'Guest']

export const sortEmployeesOptions = [
  'Name: A-Z',
  'Name: Z-A',
  'Training: True-False',
  'Training: False-True',
  'Date: Oldest to Newest',
  'Date: Newest to Oldest',
]

export const sortUsersOptions = [
  'Name: A-Z',
  'Name: Z-A',
  'Date: Oldest to Newest',
  'Date: Newest to Oldest',
]
