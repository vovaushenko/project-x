import { Router } from '@vaadin/router';
import { LitElement, PropertyValueMap, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { APPLICATION_ROUTES } from '../lib/router.routes';
import { ROUTER_OUTLET_ID } from '../shared/router.constants';
import { AVXErrorFactory } from '@project-x/web-lib';

@customElement('avx-app-router-outlet')
export class AvxAppRouterOutlet extends LitElement {
  render() {
    return html`<main>
      <div id=${ROUTER_OUTLET_ID}></div>
    </main>`;
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>,
  ): void {
    super.firstUpdated(_changedProperties);

    this._initializeRouter();
  }

  private _initializeRouter() {
    const routerHostNode = this.shadowRoot?.getElementById(ROUTER_OUTLET_ID);

    if (!routerHostNode) {
      throw AVXErrorFactory.getInstance().createCriticalApplicationError({
        message: 'Router host node is not found. Application cannot be initialized',
        details: 'Router host node is not found. Application cannot be initialized',
      });
    }

    const router = new Router(routerHostNode);
    router.setRoutes([...APPLICATION_ROUTES]);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'avx-app-router-outlet': AvxAppRouterOutlet;
  }
}
