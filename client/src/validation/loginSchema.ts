import { z } from 'zod'
import { passwordMessage } from 'src/utils/constants'

export const loginSchema = z
  .object({
    email: z.string().min(2, {
      message: 'Not valid input',
    }),
    password: z.string().min(8, passwordMessage),
  })
  .required()

export type modalFormValues = z.infer<typeof loginSchema>
