import { z } from 'zod';

const UserRole = z.enum(['admin', 'user', 'guest', 'super-admin']);

const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const UserSchema = z.object({
  id: z.string().uuid(),
  role: UserRole,
  ...CreateUserSchema.shape,
});

export type IAuthorizationRole = z.infer<typeof UserRole>;
export type IUser = z.infer<typeof UserSchema>;
export type ICreateUserDto = z.infer<typeof CreateUserSchema>;
