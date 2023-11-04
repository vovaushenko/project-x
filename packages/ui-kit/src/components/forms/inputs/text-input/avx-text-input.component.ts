import { customElement } from 'lit/decorators.js';
import { AvxBaseElement } from '../../../av-element/avx-element';
import { html } from 'lit';

@customElement('avx-text-input')
export class AvxTextInput extends AvxBaseElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <div>
        <label for="text-input">Input</label>
        <input id="text-input" type="text" name="text-input" placeholder="Text Input" />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'avx-text-input': AvxTextInput;
  }
}
