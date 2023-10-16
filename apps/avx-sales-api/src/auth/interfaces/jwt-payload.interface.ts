import { IAVXUserRole } from '@project-x/model/src/user/user.model';

export interface JwtPayload {
  id: string;
  email: string;
  role: IAVXUserRole;
}
