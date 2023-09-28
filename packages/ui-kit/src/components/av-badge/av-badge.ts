import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AvElement } from '../av-element/av-element';

@customElement('av-badge')
export class AvBadge extends AvElement {
  @property({ type: String })
  variant = 'default';

  static styles = [
    ...super.styles,
    css`
      :host {
        display: inline-block;
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-2);
        font-size: var(--fs-3);
        font-family: inherit;
        font-weight: 700;
        color: #fff;
      }

      :host([variant='default']) {
        background-color: gray;
      }

      :host([variant='danger']) {
        color: white;
        background-color: red;
      }

      :host([variant='success']) {
        color: #436b1d;
        background-color: rgba(138, 201, 79, 0.9);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'av-badge': AvBadge;
  }
}

// 4 | 5kb -> react 70kb
// it's faster then react -> 20%-50% faster

// 1) register web component namespace in the browser
// 2) shadow root -> for incapsulation
// 3) declarative templates
