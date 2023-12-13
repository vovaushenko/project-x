import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UiKitBaseElement } from '../../ui-kit-base-element/ui-kit-base.component';

@customElement('av-paragraph')
export class AvParagraph extends UiKitBaseElement {
  static styles = [
    ...super.styles,
    css`
      :host p {
        color: var(---avx-theme-color-on-surface);
        font-size: var(--fs-xxl);
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
  }

  render() {
    return html`<p>
      <slot></slot>
      There theme-${this.theme}
    </p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'av-paragraph': AvParagraph;
  }
}
