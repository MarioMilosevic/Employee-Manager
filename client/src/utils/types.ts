export type EmployeeType = {
  id?: number
  fullName: string
  startYear: Date | null
  address: string
  department: string
  employmentStatus: string
  trainingCompleted: boolean
}

// export type EmployeeErrorsType = {
//   fullName: string
//   lastName: string
//   address: string
//   startYear: string
//   department: string
//   employmentStatus: string
// }

export type UserType = {
  id?: number
  fullName: string
  email: string
  password?: string
  passwordConfirm?: string
  role: string
  createdDate: Date | null
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

export type ElementType = EmployeeType | UserType

export type InputType = {
  id: number
  name: string
  type: string
  placeholder: string
  options:string[]
}

export type TableHeadingType = {
  id: number
  name: string
  tableId: string
}