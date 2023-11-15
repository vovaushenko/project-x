import { APPLICATION_NAME_SPACE } from '@project-x/common';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../shared/ui/components/view/view.component';
import { ToastActions } from '../widgets/toasts';

const ELEMENT_NAME = `${APPLICATION_NAME_SPACE}-landing-page`;

@customElement(ELEMENT_NAME)
export class LandingPage extends ApplicationView {
  render() {
    return html`
      <section>
        <todo-list></todo-list>
        <button
          @click=${() => {
            ToastActions.success('Hello World' + Math.random() * 555);
          }}
        >
          Open Toast
        </button>
      </section>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    ELEMENT_NAME: LandingPage;
  }
}
