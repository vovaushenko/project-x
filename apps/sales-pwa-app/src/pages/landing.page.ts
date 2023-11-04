import { APPLICATION_NAME_SPACE } from '@project-x/common';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../components/view/view.component';

const ELEMENT_NAME = `${APPLICATION_NAME_SPACE}-landing-page`;

@customElement(ELEMENT_NAME)
export class LandingPage extends ApplicationView {
  render() {
    return html`
      <section>
        <form @submit=${this.handleSubmit}>
          <avx-text-input></avx-text-input>
          <div>
            <label for="zz">Email</label>
            <input id="email" type="email" name="email" placeholder="Email" />
          </div>
          <button type="submit">Submit</button>
        </form>

        <todo-list></todo-list>
      </section>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    alert("I'm connected");
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = [...new FormData(form).entries()].reduce(
      (acc, [key, value]) => ((acc[key] = value), acc),
      {} as Record<string, FormDataEntryValue>,
    );

    debugger;
    console.log({ data, formData });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    ELEMENT_NAME: LandingPage;
  }
}
