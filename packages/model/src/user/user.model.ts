import { z } from 'zod';

const UserRole = z.enum(['admin', 'user', 'guest', 'super-admin']);

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const UserSchema = z.object({
  id: z.string().uuid(),
  role: UserRole,
  ...CreateUserSchema.shape,
});

export type IAuthorizationRole = z.infer<typeof UserRole>;
export type IUser = {
  name: string;
  email: string;
  id: string;
  role: IAuthorizationRole;
  password: string;
};
export type ICreateUserDto = {
  name: string;
  email: string;
  password: string;
};
