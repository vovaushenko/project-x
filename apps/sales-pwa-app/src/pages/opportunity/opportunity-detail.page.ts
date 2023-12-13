import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ApplicationView } from '../../shared/ui/components/view/view.component';
import { ParamValue } from '@vaadin/router';

@customElement('opportunity-detail-page')
export class OpportunityDetailPage extends ApplicationView {
  render() {
    return html`
      <section>
        <h1>Opty Detail Page</h1>
        <p>Opportunity ID: ${this.opportunityId}</p>
      </section>
    `;
  }

  @state()
  opportunityId: ParamValue | null = null;

  connectedCallback(): void {
    super.connectedCallback();

    this.opportunityId = this.location?.params.id ?? null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opportunity-detail-page': OpportunityDetailPage;
  }
}
