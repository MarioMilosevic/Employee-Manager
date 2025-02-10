export type EmployeeType = {
  id?: number
  fullName: string
  startYear: Date
  address: string
  department: string
  employmentStatus: string
  trainingCompleted: boolean
}

export type EmployeeErrorsType = {
  firstName: string
  lastName: string
  address: string
  startYear: string
}

export type UserType = {
  id?: number
  fullName: string
  email: string
  password?: string
  passwordConfirm?: string
  role: string
  createdDate: Date
}

export type LoginCredentialsType = {
  email: string
  password: string
}

export type SignUpCredentialsType = {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
  role?: string
}

export type InputType = {
  id: number
  name: string
  type: string
  placeholder: string
}

export type TableHeadingType = {
  id: number
  name: string
  tableId: string
}