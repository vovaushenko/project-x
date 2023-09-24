import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../components/view/view.component';

@customElement('login-page')
export class LoginPage extends ApplicationView {
  render() {
    return html`
      <section>
        <h1>Login</h1>
        <av-badge variant="success">Success</av-badge>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-page': LoginPage;
  }
}
