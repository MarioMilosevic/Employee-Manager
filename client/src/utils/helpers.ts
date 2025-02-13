import { ZodIssue } from 'zod'
import { format } from 'date-fns'

export const emptyObject = (obj: Record<string, string>) => {
  const emptyObject = {} as Record<string, string>
  for (const key in obj) {
    emptyObject[key] = ''
  }
  return emptyObject
}

export const renderValidationErrors = (errors: ZodIssue[]) => {
  const updatedErrors: Record<string, string> = {}

  errors.forEach((error) => {
    const field = error.path[0] as string
    updatedErrors[field] = error.message
  })

  return updatedErrors
}

export const getDataFromJson = async (response: Response) => await response.json()

export const formatDate = (date: Date) => format(new Date(date), 'MMM dd yyyy')
