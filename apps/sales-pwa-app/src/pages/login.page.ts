import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../shared/ui/components/view/view.component';

@customElement('login-page')
export class LoginPage extends ApplicationView {
  render() {
    return html`
      <section>
        <avx-login-form></avx-login-form>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-page': LoginPage;
  }
}
