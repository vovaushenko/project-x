import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicatioRouter } from '../router/application-router';

@customElement('login-page')
export class LoginPage extends LitElement {
  render() {
    return html`
      <section>
        <h1>Login</h1>
        <av-badge variant="success">Success</av-badge>
        <av-button label="navigate" type="success" @click=${this.navigateClick}></av-button>
      </section>
    `;
  }

  navigateClick() {
    ApplicatioRouter.navigate('playgrounds');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-page': LoginPage;
  }
}
