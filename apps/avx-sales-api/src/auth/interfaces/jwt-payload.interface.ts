import { IAVXUserRole } from '../../../../../packages/sales-model/src/user/user.model';

export interface JwtPayload {
  id: string;
  email: string;
  role: IAVXUserRole;
}
