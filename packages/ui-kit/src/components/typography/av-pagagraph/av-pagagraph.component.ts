import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { designSystemTokens } from '../../../design-system/tokens';

@customElement('av-paragraph')
export class AvParagraph extends LitElement {
  static styles = [
    designSystemTokens,
    css`
      :host p {
        color: var(--av-primary-text-color);
      }
    `,
  ];
  render() {
    return html`<p><slot></slot></p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'av-paragraph': AvParagraph;
  }
}
