import { z } from 'zod'
import { passwordMessage } from 'src/utils/constants'

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(5, {
        message: 'Must be at least 5 characters long',
      })
      .includes(' ', {
        message: 'Must contain at least 2 words',
      }),
    email: z.string().min(2, {
      message: 'Not valid input',
    }),
    password: z.string().min(8, passwordMessage),
    passwordConfirm: z.string().min(8, passwordMessage),
  })
  .required()
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

export type modalFormValues = z.infer<typeof signUpSchema>
