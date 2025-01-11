import { z } from 'zod'
import { passwordMessage } from 'src/utils/constants'

export const signUpSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First name not long enough',
    }),
    lastName: z.string().min(2, {
      message: 'Last name not long enough',
    }),
    email: z.string().min(2, {
      message: 'Not valid input',
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
