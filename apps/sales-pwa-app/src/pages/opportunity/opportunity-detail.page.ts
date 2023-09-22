import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('opportunity-detail-page')
export class OpportunityDetailPage extends LitElement {
  render() {
    return html`
      <section>
        <h1>Opty Detail Page</h1>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opportunity-detail-page': OpportunityDetailPage;
  }
}
