import { html } from 'lit';
import './av-badge';

it('should render its children', () => {
  const badgeText = 'HELLO WORLD!';
  cy.mount(html`<av-badge>${badgeText}</av-badge>`);

  cy.get('av-badge').should('exist').invoke('text').should('eq', badgeText);
});

it('should render a default badge', () => {
  cy.mount(html`<av-badge>Default Badge</av-badge>`);

  cy.get('av-badge').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
});
it('should render a danger badge', () => {
  cy.mount(html`<av-badge variant="danger">Danger Badge</av-badge>`);

  cy.get('av-badge').should('have.css', 'background-color', 'rgb(255, 0, 0)');
});

it('should render a success badge', () => {
  cy.mount(html`<av-badge variant="success">Success Badge</av-badge>`);

  cy.get('av-badge').should('have.css', 'background-color', 'rgba(138, 201, 79, 0.9)');
});
