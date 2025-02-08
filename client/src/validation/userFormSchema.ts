import { z } from 'zod'

export const userFormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First name not long enough',
    }),
    lastName: z.string().min(2, {
      message: 'Last name not long enough',
    }),
    role: z.string().refine((value) => ['USER', 'GUEST', 'ADMIN'].includes(value), {
      message: 'USER | GUEST | ADMIN',
    }) as z.ZodType<'USER' | 'GUEST' | 'ADMIN'>,
    email: z.string().email({
      message: 'Not valid input',
    }),
  })
  .extend({
    password: z.string().min(8, { message: 'Must be at least 8 characters' }),
    passwordConfirm: z.string().min(8, { message: 'Must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  })

export type userFormValues = z.infer<typeof userFormSchema>
