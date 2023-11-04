import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AvxBaseElement } from '../../av-element/avx-element';

@customElement('av-paragraph')
export class AvParagraph extends AvxBaseElement {
  static styles = [
    ...super.styles,
    css`
      :host p {
        color: var(--av-primary-text-color);
        font-size: var(--fs-xxl);
      }
    `,
  ];

  render() {
    return html`<p>
      <slot></slot>
      theme-${this.theme}
    </p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'av-paragraph': AvParagraph;
  }
}
