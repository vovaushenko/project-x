import { customElement, state } from 'lit/decorators.js';
import { AvxBaseElement } from '../../../shared/ui';
import { css, html } from 'lit';
import { AvxNotification } from '../../../entities/notification';
import './toast.component';
import { Maybe } from '@project-x/common';

import { TOAST_SHELF_LIFE } from '../config/toasts.config';
import { AvxToast } from '../lib/toast.model';

@customElement('avx-toast-shelf')
export class AvxToastShelf extends AvxBaseElement {
  unsubsribeFromNotifications: Maybe<() => void> = null;

  @state() openToasts: AvxToast[] = [];

  protected render() {
    return html`
      <aside class="toast-container">
        <ul class="toast-list">
          ${this.openToasts.map(
            (toast) =>
              html`<li id=${toast.id}>
                <avx-toast
                  .toast=${toast}
                  @click=${() => this._removeToastById(toast.id)}
                ></avx-toast>
              </li>`,
          )}
        </ul>
      </aside>
    `;
  }
  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._subscribeToToastNotifications();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribeToToastNotifications();
  }

  private _subscribeToToastNotifications() {
    this.unsubsribeFromNotifications = AvxNotification.subscribe('toast', (evt) => {
      this._handleIncomingToastNotification(evt.detail);
    });
  }
  private _unsubscribeToToastNotifications() {
    if (
      this.unsubsribeFromNotifications &&
      typeof this.unsubsribeFromNotifications === 'function'
    ) {
      this.unsubsribeFromNotifications();
    }
  }

  private _handleIncomingToastNotification(notification: AvxNotification) {
    this._addNewToast(notification);
    this._scheduleToastRemoval(notification.id);
  }

  private _addNewToast(notification: AvxNotification) {
    if (!this._isToastTextNotificationAlreadyShown(notification)) {
      this.openToasts = [...this.openToasts, AvxToast.fromNotification(notification)];
    }
  }

  private _isToastTextNotificationAlreadyShown(notification: AvxNotification) {
    return this.openToasts.some((t) => t.message === notification.message);
  }

  private _scheduleToastRemoval(id: string) {
    setTimeout(() => {
      this._removeToastById(id);
    }, TOAST_SHELF_LIFE);
  }

  private _removeToastById(id: string) {
    this._addFadeOutAnimationToToastById(id);
    this.openToasts = this.openToasts.filter((t) => t.id !== id);
  }

  private _addFadeOutAnimationToToastById(id: string) {
    const toast = this.shadowRoot?.getElementById(id);
    if (toast) {
      toast.classList.add('fade-out-animation');
    }
  }

  /**
   * Styling
   */
  static styles = [
    ...AvxBaseElement.styles,
    css`
      :host {
        --toast-z-index: var(--z-3);
        --toast-container-padding: var(--space-8);
        --toast-list-gap: var(--space-4);

        @keyframes slide-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100px);
          }
        }

        --toast-animation-keyframes: slide-left;
        --toast-animation: slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }

      .toast-container {
        z-index: var(--toast-z-index);
        pointer-events: none;
        /* position */
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        /* display */
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        /* styling */
        padding: var(--container-padding);
      }

      .toast-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--toast-list-gap);
        list-style-type: none;
      }

      @keyframes slide-left {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100px);
        }
      }
      @starting-style {
        .toast-list li {
          animation: slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
      }

      @keyframes fade-out {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(500px);
        }
      }

      .fade-out-animation {
        animation: fade-out 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'avx-toast-shelf': AvxToastShelf;
  }
}
