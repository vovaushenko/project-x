import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../shared/ui/components/view/view.component';
import { AvxSalesEventBus } from '../shared/communication/avx-sales-event-bus';

@customElement('playgrounds-page')
export class PlaygroundsPage extends ApplicationView {
  render() {
    return html`<section>
      <h1>Playgrounds</h1>
    </section> `;
  }

  async connectedCallback() {
    super.connectedCallback();
  }

  handleSendEvent() {
    AvxSalesEventBus.emit('AVX_MESSAGE', {
      message: 'Hello from playgrounds page',
      type: 'success',
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playgrounds-page': PlaygroundsPage;
  }
}
