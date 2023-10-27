import { z, object } from 'zod';

const UserRole = z.enum(['admin', 'user', 'guest', 'super-admin']);

export const registerUserSchema = object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters long',
    }),
});

export const signUpClientUserSchema = registerUserSchema
  .extend({
    verificationPassword: z.string({
      required_error: 'Verification password is required',
    }),
  })
  .refine((data) => data.password === data.verificationPassword, {
    message: 'Passwords must match',
  });

export type IAuthorizationRole = z.infer<typeof UserRole>;

export type IAVXUser = {
  name: string;
  email: string;
  id: string;
  role: IAuthorizationRole;
  password: string;
  isActive: boolean;
};

export type IRegisterUserDto = z.infer<typeof registerUserSchema>;

export type IRegistrUserOnClientDto = z.infer<typeof signUpClientUserSchema>;
export type IUpdateUserInfoDto = Pick<IAVXUser, 'name' | 'email' | 'password'>;
export type IAVXClientUser = Omit<IAVXUser, 'password' | 'isActive'>;
