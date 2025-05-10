import { z } from 'zod'

export type AuthType = 'login' | 'register'

export interface AuthFormProps {
  type: AuthType
}

export const AuthFormSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.confirmPassword === undefined || data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type AuthFormValues = z.infer<typeof AuthFormSchema>
