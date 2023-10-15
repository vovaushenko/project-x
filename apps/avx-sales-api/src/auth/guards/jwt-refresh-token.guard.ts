import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 Existence of Refresh Token: You've already covered this. Ensure that a refresh token exists in the request. If it doesn't, there's nothing to refresh.

Verification of the Refresh Token: Verify that the refresh token exists in your database or storage, and that it's not expired or revoked. You should maintain a list of valid refresh tokens, and check if the incoming refresh token matches any of them.

Validate the Refresh Token Origin: You might want to check that the refresh token originated from a trusted source. For instance, you could check the client's IP address or the user agent string to ensure that the request is coming from the same client that originally received the token.

Anti-CSRF Protection: Implement anti-CSRF (Cross-Site Request Forgery) measures to protect against unauthorized cross-site requests. This is especially important for single-page applications (SPAs) that use JWTs.

Rate Limiting: Depending on your application's security requirements, you might consider rate limiting the refresh token endpoint to prevent abuse or brute force attacks. For example, limit the number of requests a client can make within a certain timeframe.

Logging and Auditing: Implement logging and auditing to track how refresh tokens are being used. This can help you detect and respond to suspicious activity.

Implementing Token Rotation: You might want to consider a token rotation mechanism. With token rotation, you issue a new refresh token when the old one is used. This can mitigate the impact of an attacker obtaining a long-lived refresh token.
 */

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh-token') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refresh_token = request.body.refresh_token;
    return refresh_token ? true : false;
  }
}
