import '@project-x/ui-kit';
import { AvxDesignSystem } from '@project-x/ui-kit';
import { LitElement, PropertyValueMap, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { APPLICATION_NAME_SPACE } from '@project-x/common';
import { Router } from '@vaadin/router';
import { routes } from './router/router.routes';

const ELEMENT_NAME = `${APPLICATION_NAME_SPACE}-app`;

@customElement(ELEMENT_NAME)
export class SalesApp extends LitElement {
  @property({ reflect: true })
  theme: any = '';

  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/playgrounds">Playground</a>
        <a href="/opportunities">Opty List</a>
        <a href="/login">Login</a>
        <a href="/worker">Worker</a>
        <a href="/service-worker">Service Worker</a>
      </nav>
      <main>
        <div id="outlet"></div>
      </main>
    `;
  }

  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'open',
  };

  connectedCallback(): void {
    super.connectedCallback();
    this._initializeTheme();
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

  private _initializeTheme() {
    const userPrefersDark = window.matchMedia('prefers-color-scheme: dark)').matches;
    const theme = localStorage.getItem('theme') || (userPrefersDark ? 'dark' : 'light');
    this.theme = theme;
    const toggledTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('theme', toggledTheme);

    const observer = new MutationObserver(() => {
      const appliedTheme = document.documentElement.getAttribute('theme');
      this.theme = appliedTheme;
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['theme'],
    });
  }

  static styles = [
    ...AvxDesignSystem,
    css`
      :host {
        width: 100vw;
        height: 100vh;
        display: grid;
        place-items: center;
        background-color: var(--avx-theme-color-background);
        color: var(--avx-theme-color-on-surface);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: SalesApp;
  }
}
