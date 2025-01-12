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
}

export type UserFormType = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirm: string
}

export type LoginCredentialsType = {
  email: string;
  password: string;
}

// export const arr = [
//   {
//     id: '1',
//     firstName: 'Mario',
//     lastName: 'Milosevic',
//     startYear: 2025,
//     address: 'Kotor Crna Gora 24',
//     trainingCompleted: false,
//   },
//   {
//     id: '2',
//     firstName: 'Toni',
//     lastName: 'Milosevic',
//     startYear: 2025,
//     address: 'Kotor Crna Gora 24',
//     trainingCompleted: false,
//   },
//   {
//     id: '3',
//     firstName: 'Milica',
//     lastName: 'Bugarski',
//     startYear: 2025,
//     address: 'Kotor Crna Gora 24',
//     trainingCompleted: false,
//   },
// ]
