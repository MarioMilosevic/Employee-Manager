import { z } from 'zod'

export const employeeFormSchema = z.object({
  fullName: z
    .string()
    .min(5, {
      message: 'Must be at least 5 characters long',
    })
    .includes(' ', {
      message: 'Must contain at least 2 words',
    }),
  startYear: z.string().min(2, {
    message: 'Date not selected',
  }),
  address: z.string().min(5, { message: 'Must be at least 5 characters long' }),

  employment: z.string().refine((value) => ['Contractor', 'Full', 'Part'].includes(value), {
    message: 'Contractor or Full or Part',
  }) as z.ZodType<'Contractor' | 'Full' | 'Part'>,
  department: z.string().refine((value) => ['Engineering', 'HR', 'Sales'].includes(value), {
    message: 'Engineering or HR or Sales',
  }) as z.ZodType<'Engineering' | 'HR' | 'Sales'>,
  trainingCompleted: z.boolean(),
})

export type employeeFormValues = z.infer<typeof employeeFormSchema>
