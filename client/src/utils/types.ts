export type EmployeeType = {
  id?: number
  firstName: string
  lastName: string
  startYear: string
  address: string
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
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
  role:string
}


export type LoginCredentialsType = {
  email: string;
  password: string;
}

export type SignUpCredentialsType = {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
  role?:string
}

export type InputType = {
  id: number,
  name: string;
  type: string;
  placeholder:string
}

export type TableHeadingType = {
  id: number;
  name: string;
  tableId:string
}