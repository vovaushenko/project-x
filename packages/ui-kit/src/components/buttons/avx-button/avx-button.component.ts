import { customElement, property } from 'lit/decorators.js';
import { UiKitBaseElement } from '../../ui-kit-base-element/ui-kit-base.component';
import { css, html } from 'lit';
import {
  AVXButtonEmphasis,
  AVXButtonType,
  AVX_BUTTON_TYPES,
  AVX_BUTTON_EMPHASIS,
  AVXButtonBehavior,
} from './avx-button.types';
import { ProgressActivityIcon } from '../../../shared/icons/icons';
// https://web.dev/articles/more-capable-form-controls
// https://www.hjorthhansen.dev/shadow-dom-and-forms/
@customElement('avx-button')
export class UiKitButton extends UiKitBaseElement {
  internals_: ElementInternals;
  /**
   *  General API
   */
  @property({ type: String }) type: AVXButtonType = 'filled';
  @property({ type: String }) emphasis: AVXButtonEmphasis = 'medium';
  @property({ type: String }) label: string = 'AVX Button';
  @property({ type: String }) behavior: AVXButtonBehavior = 'button';

  /**
   * Lifecycle API
   */
  @property({ type: Boolean }) isLoading: boolean = false;

  static formAssociated = true;
  static buttonAssociated = true;

  render() {
    return html`<button class="avx-button" @click="${this._click}">
      ${this.label}
      ${this.isLoading ? html`<span class="loading-icon">${ProgressActivityIcon}</span>` : ''}
    </button>`;
  }

  constructor() {
    super();
    this.internals_ = this.attachInternals();
  }

  static shadowRootOptions: ShadowRootInit = {
    ...UiKitBaseElement.shadowRootOptions,
    mode: 'open',
  };

  private _click(event: Event) {
    switch (this.behavior) {
      case 'button':
        this._handleButtonClick(event);
        break;
      case 'submit':
        this._handleSubmitClick(event);
        break;
      case 'reset':
        this._handleResetClick(event);
        break;
      default:
        this._handleButtonClick(event);
        break;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._validateInputProperties();
  }
  /**
   * Validates the input properties, throws an error and sets default values if they are invalid.
   */
  private _validateInputProperties() {
    if (!AVX_BUTTON_TYPES.includes(this.type)) {
      this.type = 'filled';
      throw new Error(
        `Invalid value for property "type": "${
          this.type
        }". Valid values are: ${AVX_BUTTON_TYPES.join(' ')}.`,
      );
    }

    if (!AVX_BUTTON_EMPHASIS.includes(this.emphasis)) {
      this.emphasis = 'medium';
      throw new Error(
        `Invalid value for property "emphasis": "${
          this.emphasis
        }". Valid values are: ${AVX_BUTTON_EMPHASIS.join(' ')}.`,
      );
    }
  }

  private _getButtonContent() {
    const buttonType = this.type;

    switch (buttonType) {
      case 'filled':
        return html`<slot></slot>`;
      case 'filled-tonal':
        return html`<slot></slot>`;
      case 'outlined':
        return html`<slot></slot>`;
      case 'text':
        return html`<slot></slot>`;
      case 'icon':
        return html`<slot></slot>`;
      case 'elevated':
        return html`<slot></slot>`;
      default:
        return html`<slot></slot>`;
    }
  }

  private _handleResetClick(event: Event) {
    throw new Error(`Method not implemented: ${event}`);
  }
  private _handleSubmitClick(event: Event) {
    const form = this.closest('form');
    if (form) {
      event.preventDefault();
      const fakeSubmit = document.createElement('button');
      fakeSubmit.type = 'submit';
      fakeSubmit.style.display = 'none';
      form.appendChild(fakeSubmit);
      fakeSubmit.click();
      fakeSubmit.remove();
    }
  }
  private _handleButtonClick(event: Event) {
    throw new Error(`Method not implemented: ${event}`);
  }

  /**
   * Styling
   */

  static styles = [
    ...UiKitBaseElement.styles,
    css`
      /**
      * Default button styles that can be overridden 
      */
      :host .avx-button {
        --padding: var(--space-m3-btn);
        --border-radius: var(--radius-m3-btn);
        --text-color: var(--avx-theme-color-on-secondary, red);
        --icon-color: var(--avx-theme-color-on-secondary, red);
        --font-size: var(--fs-4);
        --bg-color: var(--avx-theme-color-secondary-container);
        --font-family: var(--ff-primary);

        --elevated-bg-color: var(--avx-theme-color-white);
        --elevated-color: var(--avx-theme-color-primary-30);
        --elevated-box-shadow: var(--bs-m3-7);
      }

      .avx-button {
        cursor: pointer;
        padding: var(--padding);
        border-radius: var(--border-radius);
        border: 0;
        cursor: pointer;
        display: flex;
        align-items: center;

        gap: var(--space-2);

        color: var(--text-collor);
        background-color: var(--bg-color);

        font-family: var(--font-family);
        font-size: var(--font-size);
        font-weight: 600;
        text-transform: capitalize;
      }

      .avx-button__elevated {
        box-shadow: var(--elevated-box-shadow);
        color: var(--elevated-color);
        background-color: var(--elevated-bg-color);
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .loading-icon {
        fill: #f1f1ea;
        animation: spin 3s linear infinite;
      }
      :host([type='elevated']) .avx-button {
        box-shadow:
          rgba(0, 0, 0, 0.12) 0px 1px 3px,
          rgba(0, 0, 0, 0.24) 0px 1px 2px;
        color: var(--elevated-color);
        background-color: var(--elevated-bg-color);
      }

      /* :host([variant='default']) {
        background-color: gray;
      }

      :host([variant='danger']) {
        color: white;
        background-color: red;
      }

      :host([variant='success']) {
        color: #436b1d;
        background-color: rgba(138, 201, 79, 0.9);
      } */
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'avx-button': UiKitButton;
  }
}
