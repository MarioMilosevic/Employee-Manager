export const baseUrl = 'http://localhost:3000/api/v1'

export const emptySingleEmployee = {
  firstName: '',
  lastName: '',
  address: '',
  startYear: '',
  trainingCompleted: false,
}

export const emptySingleUser = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
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
