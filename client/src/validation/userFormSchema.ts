import { z } from 'zod'

const RoleEnum = z.enum(['USER', 'GUEST', 'ADMIN'])

export const userFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name not long enough',
  }),
  lastName: z.string().min(2, {
    message: 'Last name not long enough',
  }),
  role: RoleEnum.refine((value) => ['USER', 'GUEST', 'ADMIN'].includes(value), {
    message: 'Role must be one of USER, GUEST, or ADMIN',
  }),
})

export type modalFormValues = z.infer<typeof userFormSchema>
