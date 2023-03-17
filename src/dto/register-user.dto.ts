import { z } from 'zod';

export const RegisterUserSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Must be a string',
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Must be a string',
    })
    .email('Wrong format for an email'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Must be a string',
    })
    .min(6, 'Password must contain at least 6 characters'),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;
