import { z } from 'zod'

const passwordMessage = { message: 'Password must be at least 8 characters' }

export const signUpSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First name not long enough',
    }),
    lastName: z.string().min(2, {
      message: 'Last name not long enough',
    }),
    email: z.string().min(2, {
      message: 'Date not selected',
    }),
    password: z.string().min(8, passwordMessage),
    confirm: z.string().min(8, passwordMessage),
  })
  .required()
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

export type modalFormValues = z.infer<typeof signUpSchema>
