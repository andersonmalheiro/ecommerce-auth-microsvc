import { z } from 'zod';

export const UpdatePasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type UpdatePasswordDTO = z.infer<typeof UpdatePasswordSchema>;
