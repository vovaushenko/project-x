import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('opportunity-list-page')
export class OpportunityListPage extends LitElement {
  render() {
    return html`
      <section>
        <h1>Opty List</h1>
        <ul>
          <li>
            <div>
              Opty 1
              <a href="opportunities/1">go</a>
            </div>
          </li>
          <li>
          <div>
              Opty 2
              <a href="opportunities/2">go</a>
            </div>
          </li></li>
          <li>
          <div>
              Opty 3
              <a href="opportunities/3">go</a>
            </div>
          </li></li>
        </ul>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opportunity-list-page': OpportunityListPage;
  }
}
