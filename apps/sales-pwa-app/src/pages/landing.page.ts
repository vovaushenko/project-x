import { APPLICATION_NAME_SPACE } from '@project-x/common';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../shared/ui/components/view/view.component';
import { UiKitThemeUtils } from '@project-x/ui-kit';

const ELEMENT_NAME = `${APPLICATION_NAME_SPACE}-landing-page`;

@customElement(ELEMENT_NAME)
export class LandingPage extends ApplicationView {
  render() {
    return html`
      <section>
        <avx-theme-toggle-button></avx-theme-toggle-button>
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
