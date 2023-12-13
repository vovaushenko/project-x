import { html } from 'lit';
import './ui-kit-base.component';
import { UI_KIT_THEME_NAMESPACE } from '../../design-system/lib/theme.constants';

describe('AvElement', () => {
  it('should be able to instantiate', () => {
    cy.mount(html`<av-element></av-element>`);

    cy.get('av-element').should('exist');
  });

  it('should connect (on DOM connect) and disconnect(on DOM disconnect) to MutationObserver to control theming', () => {
    cy.window().then((win) => {
      const observeSpy = cy.spy(win.MutationObserver.prototype, 'observe');
      const disconnectSpy = cy.spy(win.MutationObserver.prototype, 'disconnect');

      cy.document().then((doc) => {
        const element = doc.createElement('av-element');
        doc.body.appendChild(element);
      });

      cy.wrap(observeSpy).should('have.been.calledOnce');

      cy.document().then((doc) => {
        const element = doc.querySelector('av-element');
        if (element) {
          element.remove();
        }
      });

      cy.wrap(disconnectSpy).should('have.been.calledOnce');
    });
  });

  it('should be instantiated with not defined theme by default', () => {
    cy.mount(html`<av-element></av-element>`);
    cy.get('av-element').invoke('prop', 'theme').should('be.null');
  });

  it('should update theme to dark when attribute changes', () => {
    cy.mount(html`<av-element></av-element>`);

    cy.document().then((doc) => {
      doc.documentElement.setAttribute(UI_KIT_THEME_NAMESPACE, 'dark');
    });

    cy.wait(0);

    cy.get('av-element').invoke('prop', UI_KIT_THEME_NAMESPACE).should('equal', 'dark');
  });

  it('should update theme to light when attribute changes', () => {
    cy.mount(html`<av-element></av-element>`);

    cy.document().then((doc) => {
      doc.documentElement.setAttribute(UI_KIT_THEME_NAMESPACE, 'light');
    });

    cy.wait(0);

    cy.get('av-element').invoke('prop', UI_KIT_THEME_NAMESPACE).should('equal', 'light');
  });

  it('should log a warning for unsupported theme and set theme to not defined', () => {
    cy.mount(html`<av-element></av-element>`);

    cy.window().then((win) => {
      cy.spy(win.console, 'warn').as('consoleWarn');
    });

    cy.document().then((doc) => {
      doc.documentElement.setAttribute('theme', 'unsupported-theme');
    });

    cy.wait(100);
    cy.get('av-element').invoke('prop', UI_KIT_THEME_NAMESPACE).should('equal', null);

    cy.get('@consoleWarn').should(
      'be.calledWith',
      'Current theme - unsupported-theme is not supported by ui-kit',
    );
  });
});
