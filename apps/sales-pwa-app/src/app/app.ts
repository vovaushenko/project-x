import '@project-x/ui-kit';
import { AvxDesignSystem, UiKitTheme } from '@project-x/ui-kit';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { APPLICATION_NAME_SPACE, Maybe } from '@project-x/common';
import { WithTheme } from '../widgets/theme';

const ELEMENT_NAME = `${APPLICATION_NAME_SPACE}-app`;

@customElement(ELEMENT_NAME)
export class SalesApp extends LitElement {
  @property({ reflect: true })
  public theme: Maybe<UiKitTheme> = null;

  render() {
    return html`
      <avx-app-navigation></avx-app-navigation>
      <avx-app-router-outlet></avx-app-router-outlet>
    `;
  }

  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'open',
  };

  constructor() {
    super();
    new WithTheme(this);
  }

  static styles = [
    ...AvxDesignSystem,
    css`
      :host {
        width: 100vw;
        height: 100vh;
        display: grid;
        place-items: center;
        background-color: var(--avx-theme-color-background);
        color: var(--avx-theme-color-on-surface);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [ELEMENT_NAME]: SalesApp;
  }
}
