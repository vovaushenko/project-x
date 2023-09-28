import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../components/view/view.component';

@customElement('playgrounds-page')
export class PlaygroundsPage extends ApplicationView {
  render() {
    return html`<section>
      <h1>Playgrounds</h1>
      <av-button variant="primary">Primary</av-button>
      <av-paragraph>Hello world!</av-paragraph>
      <av-mock-theme></av-mock-theme>
    </section> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playgrounds-page': PlaygroundsPage;
  }
}
