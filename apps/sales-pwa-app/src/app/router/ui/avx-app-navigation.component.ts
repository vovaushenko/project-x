import { LitElement, css, html } from 'lit';
import { APPLICATION_ROUTES } from '../lib/router.routes';
import { customElement } from 'lit/decorators.js';

@customElement('avx-app-navigation')
export class AvxAppNavigation extends LitElement {
  protected render() {
    return html`
      <nav class="avx-app-navigation">
        <ul class="avx-app-navigation__route-list">
          ${APPLICATION_ROUTES.map(
            (route) => html`
              <li>
                <a href="${route.path}">${route.path}</a>
              </li>
            `,
          )}
        </ul>
        <avx-theme-toggle-button></avx-theme-toggle-button>
      </nav>
    `;
  }

  static styles = css`
    .avx-app-navigation__route-list {
      list-style: none;
      display: flex;
      gap: var(--space-4);
    }

    .avx-app-navigation__route-list li {
      padding: var(--space-2);
      border-radius: var(--radius-m3-btn);
      background-color: var(--avx-theme-color-secondary-container);
    }

    .avx-app-navigation__route-list li a {
      color: var(--avx-theme-color-primary-80);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'avx-app-navigation': AvxAppNavigation;
  }
}
