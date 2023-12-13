import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ApplicationView } from '../../shared/ui/components/view/view.component';

@customElement('opportunity-list-page')
export class OpportunityListPage extends ApplicationView {
  render() {
    const optyList = this.getListOfOpportunities();
    return html`
      <section>
        <h1>Opty List</h1>
        ${optyList}
      </section>
    `;
  }

  getListOfOpportunities() {
    const opportunities = this.getOpportunities();

    return opportunities.map((opty) => {
      return html`<li>
        <div>
          ${opty.name}
          <button @click="${() => this.navigateToOptyDetail(opty.id)}">go</button>
        </div>
      </li>`;
    });
  }

  getOpportunities() {
    return [
      { name: 'Amazon', id: '1' },
      {
        name: 'Google',
        id: '2',
      },
      {
        name: 'Microsoft',
        id: '3',
      },
    ];
  }

  navigateToOptyDetail(id: string) {
    this.navigateTo(`/opportunities/${id}`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opportunity-list-page': OpportunityListPage;
  }
}
