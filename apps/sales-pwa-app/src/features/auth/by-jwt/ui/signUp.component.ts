import { LitElement, html } from 'lit';
import { JwtAuthService } from '../service/jwt-auth.service';
import { customElement, state } from 'lit/decorators.js';
import { IAVXClientUser, signUpClientUserSchema } from '@project-x/model';
import { ZodError } from 'zod';

@customElement('avx-sign-up-flow')
export class AvxSignUpFlow extends LitElement {
  private jwtAuthService = new JwtAuthService();

  @state() user: IAVXClientUser | null = null;
  @state() tokens: { accessToken: string; refreshToken: string } | null = null;

  constructor() {
    super();
  }

  render() {
    const isSignedUp = this.user ? true : false;
    const jwtFlow = isSignedUp ? this._getSignedInFlow() : this._getSignUpFlow();

    return html` ${jwtFlow} `;
  }
  private _getSignUpFlow() {
    return html`
      <h1>Sign up with your email and password</h1>
      <form @submit=${this._handleSignUp}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="password" name="verificationPassword" placeholder="Verification Password" />

        <button type="submit">Sign Up</button>
      </form>
    `;
  }

  private _getSignedInFlow() {
    return html`
      <h1>Welcome, user with email: ${this.user?.email}</h1>

      ${this.tokens
        ? html`<p>
            Cool Here are your tokens. Access token: ${this.tokens.accessToken} Refresh token:
            ${this.tokens.refreshToken}
          </p>`
        : html` <p>Now you can sign in</p>`}

      <form @submit=${this._handleSignIn}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />

        <button type="submit">Sign In</button>
      </form>
    `;
  }

  private async _handleSignUp(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const clientSingUpDto = [...new FormData(form).entries()].reduce(
      (acc, [key, value]) => ((acc[key] = value), acc),
      {} as Record<string, FormDataEntryValue>,
    );

    try {
      const signUpDto = signUpClientUserSchema.parse(clientSingUpDto);

      const signUpResult = await this.jwtAuthService.signUp(signUpDto);
      if (signUpResult.success) {
        this.user = signUpResult.value;
      } else {
        alert('Error signing up');
      }
    } catch (error) {
      if (error instanceof ZodError) {
        alert('ZOD ERROR');
        console.log(error.issues);
      } else {
        alert('Error signing up');
      }
    }
  }

  private async _handleSignIn(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const signInResult = await this.jwtAuthService.signIn({ email, password });

    if (signInResult.success) {
      alert('Congrats, you are signed in');
      this.tokens = signInResult.value;
    } else {
      alert('Error signing in');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'avx-sign-up-flow': AvxSignUpFlow;
  }
}
