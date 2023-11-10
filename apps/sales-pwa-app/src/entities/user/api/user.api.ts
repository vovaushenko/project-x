import { IAVXClientUser } from '@project-x/model';
import { HttpService } from '@project-x/web-lib';

export class UserApiService extends HttpService {
  public async getUser() {
    return this.get<IAVXClientUser>('/v1/users/me');
  }
}
