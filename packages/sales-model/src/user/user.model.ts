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

export type IAVXUserRole = z.infer<typeof UserRole>;

export type IAVXUser = {
  name: string;
  email: string;
  id: string;
  isActive: boolean;
  role: IAVXUserRole;
  password: string;
};

export type IAVXClientUser = Omit<IAVXUser, 'password' | 'isActive'>;

export type IRegisterUserDto = Omit<IAVXUser, 'id' | 'role' | 'isActive'>;

export type ISignInUserDto = Pick<IAVXUser, 'email' | 'password'>;
