import { LitElement, PropertyValueMap, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ServiceWorkerUtils } from '../worker/service-worker';
import { initServiceWorker } from '../worker/service-worker';

@customElement('av-service-worker-page')
export class ServiceWorkerPage extends LitElement {
  render() {
    return html`
      <h1>Service Worker Playground</h1>

      ${this.isOnline ? html`<h2>Online</h2>` : html`<h2>Offline 💥</h2>`}
    `;
  }

  @state() isOnline = ServiceWorkerUtils.isOnline();

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener('online', () => {
      this.isOnline = true;
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>,
  ): void {
    super.firstUpdated(_changedProperties);

    initServiceWorker();
  }
}
