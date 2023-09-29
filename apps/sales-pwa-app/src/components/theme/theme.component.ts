import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

declare type themeType = 'dark' | 'light' | '';
declare class ThemeHost {
  theme: themeType;
}
const registeredComponents: (ThemeHost & HTMLElement)[] = [];
const themeObserver = new MutationObserver(() => {
  registeredComponents.forEach((component) => {
    // really check - the best
    component.theme = (document.documentElement.getAttribute('theme') || '') as themeType;
  });
});
themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['theme'],
});

export class ThemeWrapper extends LitElement {
  @property({ reflect: true })
  theme: themeType = '';

  constructor() {
    super();
    registeredComponents.push(this);
  }
}
