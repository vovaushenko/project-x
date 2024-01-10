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
      <form @submit=${this.onSubmitHandler}>
        <avx-text-input
          style="padding: 100px"
          label="name"
          type="text"
          name="name"
        ></avx-text-input>
        <avx-button type="outlined" label="Sign In" behavior="submit"></avx-button>
      </form>
    `;
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    // for testing purposes currently
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-page': LoginPage;
  }
}
