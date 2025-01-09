import { z } from 'zod'

export const signUpSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name not long enough',
  }),
  lastName: z.string().min(2, {
    message: 'Last name not long enough',
  }),
  email: z.string().min(2, {
    message: 'Date not selected',
  }),
  address: z.string().min(5, { message: 'Must be at least 5 characters long' }),
  trainingCompleted:z.boolean()
})

export type modalFormValues = z.infer<typeof signUpSchema>
