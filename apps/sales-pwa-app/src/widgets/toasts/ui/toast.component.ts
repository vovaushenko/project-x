import { customElement, property } from 'lit/decorators.js';
import { AvxBaseElement } from '../../../shared/ui';
import { IToast } from '../lib/toast.types';
import { css, html, nothing } from 'lit';

@customElement('avx-toast')
export class AvxToast extends AvxBaseElement {
  @property() toast?: IToast;

  protected render() {
    if (!this.toast) return nothing;

    const icon = this._getToastIcon();

    return html` <article class="toast-card">
      <span> ${icon} </span>
      <h4>${this.toast.message}</h4>
    </article>`;
  }

  private _getToastIcon() {
    switch (this.toast?.variant) {
      case 'success':
        return html`<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="toast-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg> `;
      case 'error':
        return html`<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="toast-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg> `;
      case 'warn':
        return html`<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="toast-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg> `;
      case 'info':
        return html`<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="toast-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg> `;
      default:
        return nothing;
    }
  }

  static styles = [
    ...AvxBaseElement.styles,
    css`
      .toast-card {
        pointer-events: auto;

        display: flex;
        gap: var(--space-2);
        align-items: center;
        justify-content: space-between;

        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-4);
        background-color: var(--avx-theme-color-tertiary-container);
        color: var(--avx-theme-color-on-tertiary-container);
      }

      .toast-icon {
        width: var(--fs-icon);
        height: var(--fs-icon);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'avx-toast': AvxToast;
  }
}
