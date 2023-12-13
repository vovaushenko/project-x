import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AvxBaseElement } from '../../../../shared/ui';
import { authMachineService } from '../../service/auth-machine.service';
import { AVXError } from '@project-x/web-lib';

@customElement('avx-login-form')
export class AvxLoginForm extends AvxBaseElement {
  private authService = authMachineService;

  @state() private authUi: any = null;
  @state() private accessToken: string = '';
  @state() private refreshToken: string = '';
  @state() private isSigningUp: boolean = false;

  render() {
    return html`${this.authUi}`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.authService.start();

    this.authService.onTransition((state) => {
      console.log({ state });
      if (state.matches('unaunthenticated')) {
        this.authUi = this._getUnautenticatedUi();
        if (state.context.error) {
          this._announceError(state.context.error);
        }
      } else if (state.matches('signingIn')) {
        this.authUi = this._getLoadingUi();
      } else if (state.matches('signingUp')) {
        this.authUi = this._getLoadingUi();
      } else if (state.matches('authenticated')) {
        this.accessToken = state.context.accessToken;
        this.refreshToken = state.context.refreshToken;
        this.authUi = this._getAuthenticatedUi();
      }
    });
  }

  _getUnautenticatedUi() {
    return this.isSigningUp ? this._getSignUpUi() : this._getSignInUi();
  }

  _getLoadingUi() {
    return html`<div>Loading...</div>`;
  }

  disconnectedCallback(): void {}

  private _handleSignIn(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    this.authService.send({ type: 'SIGN_IN', payload: { email, password } });
  }

  private _announceError(error: AVXError) {
    alert(error.message);
  }

  private _getAuthenticatedUi() {
    return html`<div>
      Authenticated Access Token ${this.accessToken} Refresh Token ${this.refreshToken}
    </div>`;
  }

  private _getSignUpUi() {
    return html`<form class="avx-login-form" @submit=${this._handleSignIn}>
        <h3>Login</h3>
        <div class="wip-feature">
          <label for="email">Email</label>
          <input id="email" type="email" name="email" placeholder="Email" />
        </div>
        <div class="wip-feature">
          <label for="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Password" />
        </div>

        <div class="wip-feature">
          <label for="verificationPassword">Verify Password</label>
          <input
            id="verificationPassword"
            type="password"
            name="verificationPassword"
            placeholder="verify password"
          />
        </div>

        <avx-button type="filled" label="Sign Up" behavior="submit"></avx-button>
      </form>
      <div class="wip-feature">
        <avx-button type="outlined" label="Sign In" @click=${this._swithToSignIn}></avx-button>
        <avx-button type="outlined" label="Forgot Passwords"></avx-button>
      </div> `;
  }

  private _getSignInUi() {
    return html`<form class="avx-login-form" @submit=${this._handleSignIn}>
        <h3>Login</h3>
        <div class="wip-feature">
          <label for="email">Email</label>
          <input id="email" type="email" name="email" placeholder="Email" />
        </div>
        <div class="wip-feature">
          <label for="password">Password</label>
          <input id="password" type="password" name="password" placeholder="Password" />
        </div>

        <avx-button type="filled" label="Sign In" behavior="submit"></avx-button>
      </form>

      <div class="wip-feature">
        <avx-button type="outlined" label="Sign Up" @click=${this._swithToSignUp}></avx-button>
      </div> `;
  }

  private _swithToSignUp() {
    this.authUi = this._getSignUpUi();
  }
  private _swithToSignIn() {
    this.authUi = this._getSignInUi();
  }

  static styles = [
    ...AvxBaseElement.styles,
    css`
      .avx-login-form {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }
    `,
  ];
}
