import { Ref } from 'vue'
import { ZodIssue } from 'zod'

export const renderValidationErrors = (formState: Ref, errors: ZodIssue[]) => {
  const updatedErorrs = { ...formState.value }
  errors.forEach((error) => {
    const field = error.path[0] as keyof typeof formState
    updatedErorrs[field] = error.message
    return updatedErorrs
  })
  return updatedErorrs
}

//   const key = error.path[0] as keyof typeof formState
//   const value = (formState[key] = error.message)
//   const errorObj = {
//     key,
//     value,
//   }
//   return errorObj
// })
// return errorMessages

//  errors.forEach((error) => {
//    console.log(error)
//    const field = error.path[0] as keyof typeof formErrors
//    formErrors[field] = error.message
//  })
