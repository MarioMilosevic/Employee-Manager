export type EmployeeType = {
  id?: number
  fullName: string
  startYear: Date | string
  address: string
  department: string
  employment: string
  trainingCompleted: boolean
}

export type UserType = {
  id?: number
  fullName: string
  email: string
  password?: string
  passwordConfirm?: string
  role: string
  createdDate: Date | null | string
}

export type LoginCredentialsType = {
  email: string
  password: string
}

export type SignUpCredentialsType = {
  fullName: string
  email: string
  password: string
  passwordConfirm: string
  role: string
  createdDate:Date | null
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

export type SortFilterOptions = 'sort' | 'department' | 'employment' | 'role'
