import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { JwtAuthService } from '../service/jwt-auth.service';

@customElement('avx-jwt-auth-flow')
export class JwtAuthFlow extends LitElement {
  private jwtAuthService: JwtAuthService = new JwtAuthService();

  render() {
    return html`<form @submit=${this._performLogin}>
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>`;
  }

  private _performLogin(e: FormDataEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log({ email, password });

    this.jwtAuthService.signUp(email as string, password as string);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'avx-jwt-auth-flow': JwtAuthFlow;
  }
}
