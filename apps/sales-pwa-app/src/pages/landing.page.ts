import { APPLICATION_NAME_SPACE } from 'common';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Logger } from 'web-lib';
import { ApplicationView } from '../components/view/view.component';

const ELEMENT_NAME = `${APPLICATION_NAME_SPACE}-landing-page`;

@customElement(ELEMENT_NAME)
export class LandingPage extends ApplicationView {
  render() {
    return html`
      <section>
        <h1>Hello on Sales PWA Landing Page!!!</h1>
        <h2>Update</h2>
        <button id="logger-btn" @click=${() => this._onClick()}>Log</button>
        <av-badge variant="success">Success</av-badge>
        <av-badge variant="danger">Danger</av-badge>
        <av-badge variant="default">Default</av-badge>
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
