import { z, ZodError } from 'zod'

const twoWordsMessage = 'Must contain at least 2 words'
const min5Chars = 'Must be at least 5 characters long'

export const employeeFormSchema = z.object({
  fullName: z
    .string()
    .min(5, {
      message: min5Chars,
    })
    .includes(' ', {
      message: twoWordsMessage,
    }),
  startYear: z.string().min(2, {
    message: 'Date not selected',
  }),
  address: z.string().min(5, { message: min5Chars }).includes(' ', {
    message: twoWordsMessage,
  }),

  employment: z.string().refine((value) => ['Contractor', 'Full', 'Part'].includes(value), {
    message: 'Contractor or Full or Part',
  }) as z.ZodType<'Contractor' | 'Full' | 'Part'>,
  department: z.string().refine((value) => ['Engineering', 'HR', 'Sales'].includes(value), {
    message: 'Engineering or HR or Sales',
  }) as z.ZodType<'Engineering' | 'HR' | 'Sales'>,
  trainingCompleted: z.boolean(),
})

export type EmployeeSchema = z.infer<typeof employeeFormSchema>
export type EmployeeSchemaFields = keyof EmployeeSchema

export type EmployeeFieldErorrs = {
  [key in EmployeeSchemaFields]?: string
}
export type EmployeeTouchedFields = {
  [key in EmployeeSchemaFields]?: boolean
}

export function getEmployeeFieldError<T extends EmployeeSchemaFields, K extends EmployeeSchema[T]>(
  property: T,
  value: K,
) {
  const { error } = employeeFormSchema.shape[property].safeParse(value)
  if (!error) return
  return error.issues[0]?.message
}

export const getEmployeeErrors = (error: ZodError) => {
  return error.issues.reduce((all, issue) => {
    const path = issue.path.join('') as keyof EmployeeSchema
    const message = all[path] ? all[path] : ''
    if (all[path]) {
      return all
    }
    all[path] = message + issue.message
    return all
  }, {} as EmployeeFieldErorrs)
}
