import { format } from 'date-fns'

export const emptyObject = (obj: Record<string, string>) => {
  const emptyObject = {} as Record<string, string>
  for (const key in obj) {
    emptyObject[key] = ''
  }
  return emptyObject
}

export const getDataFromJson = async (response: Response) => await response.json()

export const formatDate = (date: Date) => format(new Date(date), 'MMM dd yyyy')
