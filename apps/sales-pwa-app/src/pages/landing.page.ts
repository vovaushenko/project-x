import { APPLICATION_NAME_SPACE } from '@project-x/common';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../components/view/view.component';
import { UiKitThemeUtils } from '@project-x/ui-kit';

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
          <avx-button type="filled" label="Toggle Theme" @click=${this._toggleTheme}></avx-button>
          <avx-button label="hello" isLoading="true"></avx-button>
          <avx-button label="Elevated" type="elevated"></avx-button>
          <av-paragraph>This is paragraph 2</av-paragraph>
          <av-mock-theme></av-mock-theme>
        </form>

        <todo-list></todo-list>
      </section>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  private _toggleTheme() {
    UiKitThemeUtils.toggleTheme();
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = [...new FormData(form).entries()].reduce(
      (acc, [key, value]) => ((acc[key] = value), acc),
      {} as Record<string, FormDataEntryValue>,
    );

    console.log({ data, formData });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    ELEMENT_NAME: LandingPage;
  }
}
