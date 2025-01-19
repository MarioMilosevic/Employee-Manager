import { Ref } from 'vue'
import { ZodIssue } from 'zod'

export const emptyObject = (obj: Record<string, string>) => {
  const emptyObject = {} as Record<string, string>
  for (const key in obj) {
    emptyObject[key] = ''
  }
  return emptyObject
}

export const renderValidationErrors = (
  formState: Ref<Record<string, string>>,
  errors: ZodIssue[],
) => {
  const updatedErrors = emptyObject(formState.value)

  errors.forEach((error) => {
    const field = error.path[0] as keyof typeof formState.value
    if (field in updatedErrors) {
      updatedErrors[field] = error.message
    }
  })
  return updatedErrors
}

export const getDataFromJson = async (response: Response) => (await response.json())
// export const getDataFromJson = async (response: Response) => (await response.json()).data
