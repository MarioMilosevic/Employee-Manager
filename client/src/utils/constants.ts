import { EmployeeType, UserType } from './types'

export const baseUrl = 'http://localhost:3000/api/v1'

export const emptySingleEmployee: EmployeeType = {
  fullName: '',
  address: '',
  startYear: null,
  department: '',
  employmentStatus: '',
  trainingCompleted: false,
}

export const emptySingleUser: UserType = {
  fullName: '',
  email: '',
  role: '',
  createdDate: null,
}

export const passwordMessage = { message: 'Password must be at least 8 characters' }

export const emptySignUpObj: UserType = {
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  role: 'USER',
  createdDate: null,
}

export const emptyLoginObj = {
  email: '',
  password: '',
}

export const departmentOptions = ['Department', 'All', 'Engineering', 'HR', 'Sales']

export const employmentStatusOptions = ['Employment Status', 'All', 'Contractor', 'Full', 'Part']

export const userRoles = ['Role', 'All', 'Admin', 'User', 'Guest']

export const sortEmployeesOptions = [
  'Name: A-Z',
  'Name: Z-A',
  'Training: Yes-No',
  'Training: No-Yes',
  'Date: Oldest to Newest',
  'Date: Newest to Oldest',
]

export const sortUsersOptions = [
  'Name:A-Z',
  'Name:Z-A',
  'Date: Oldest to Newest',
  'Date: Newest to Oldest',
]
