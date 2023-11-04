import { APPLICATION_NAME_SPACE } from '@project-x/common';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Logger } from '@project-x/web-lib';
import { ApplicationView } from '../components/view/view.component';

const ELEMENT_NAME = `${APPLICATION_NAME_SPACE}-landing-page`;

@customElement(ELEMENT_NAME)
export class LandingPage extends ApplicationView {
  render() {
    return html`
      <section>
        <todo-list></todo-list>
      </section>
    `;
  }

  private _onClick() {
    const msg = 'Hello World!';
    Logger.log(msg);
    Logger.alert(msg);
    this.dispatchEvent(new CustomEvent('logger', { detail: msg }));
  }

  static styles = css`
    :host {
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    ELEMENT_NAME: LandingPage;
  }
}
