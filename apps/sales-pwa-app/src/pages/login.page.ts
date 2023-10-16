import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../components/view/view.component';

@customElement('login-page')
export class LoginPage extends ApplicationView {
  render() {
    return html`
      <section>
        <h1>Login</h1>
        ${this.getJwtAuthFeature()}
      </section>
    `;
  }

  getJwtAuthFeature() {
    return html`<avx-jwt-auth-flow></avx-jwt-auth-flow>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-page': LoginPage;
  }
}
