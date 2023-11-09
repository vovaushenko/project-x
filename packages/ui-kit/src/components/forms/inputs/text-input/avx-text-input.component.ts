import { customElement } from 'lit/decorators.js';
import { UiKitBaseElement } from '../../../ui-kit-base-element/ui-kit-base.component';
import { html } from 'lit';

@customElement('avx-text-input')
export class AvxTextInput extends UiKitBaseElement {
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
