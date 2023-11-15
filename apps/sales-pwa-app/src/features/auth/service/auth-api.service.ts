import {
  IAVXClientUser,
  IRegisterUserDto,
  ISalesSignInApiResponse,
  ISalesSignInDto,
} from '@project-x/model';
import { HttpService } from '@project-x/web-lib';
import { BASE_API_PATH } from '../../../shared/api/api';

export class AuthApiService extends HttpService {
  private BASE_URL = `${BASE_API_PATH}/v1/auth`;

  async signIn({ email, password }: ISalesSignInDto) {
    const signInResult = await this.post<ISalesSignInApiResponse>(`${this.BASE_URL}/sign-in`, {
      email,
      password,
    });
    return signInResult;
  }
  async signUp({ email, password }: IRegisterUserDto) {
    return this.post<IAVXClientUser>(`${this.BASE_URL}/sign-up`, {
      email,
      password,
    });
  }
  refreshToken() {}
}
