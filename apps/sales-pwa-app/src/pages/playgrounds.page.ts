import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('playgrounds-page')
export class PlaygroundsPage extends LitElement {
  render() {
    return html`<section>
      <h1>Playgrounds</h1>
    </section> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playgrounds-page': PlaygroundsPage;
  }
}
