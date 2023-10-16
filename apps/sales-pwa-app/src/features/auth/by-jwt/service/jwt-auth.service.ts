import { HttpService } from '@project-x/web-lib';

export class JwtAuthService extends HttpService {
  constructor() {
    super();
  }

  async signUp(email: string, password: string) {
    const signUpResponse = await this.post('http://localhost:3000/v1/auth/sign-up', {
      email,
      password,
    });
    if (signUpResponse.success) {
      return signUpResponse.value;
    } else {
      return null;
    }
  }

  async signIn(email: string, password: string) {
    const signInResponse = await this.post('http://localhost:3000/v1/auth/sign-in', {
      email,
      password,
    });
    if (signInResponse.success) {
      return signInResponse.value;
    } else {
      return null;
    }
  }
}
