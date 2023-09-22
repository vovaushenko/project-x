import { LitElement, PropertyValueMap, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { APPLICATION_NAME_SPACE } from 'common';
import { Router } from '@vaadin/router';
import 'ui-kit';
import { routes } from './router/router.routes';

const ELEMENT_NAME = `${APPLICATION_NAME_SPACE}-app`;

@customElement(ELEMENT_NAME)
export class SalesApp extends LitElement {
  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/playgrounds">Playground</a>
        <a href="/opportunities">Opty List</a>
        <a href="/login">Login</a>
      </nav>
      <main>
        <div id="outlet"></div>
      </main>
    `;
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>,
  ): void {
    super.firstUpdated(_changedProperties);

    this._initializeRouter();
  }

  private _initializeRouter() {
    const router = new Router(this.shadowRoot?.getElementById('outlet') as HTMLElement);
    router.setRoutes([...routes]);
  }

  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      display: grid;
      place-items: center;
      background-color: #646cffaa;
      color: rgba(255, 255, 255, 0.9);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: SalesApp;
  }
}
