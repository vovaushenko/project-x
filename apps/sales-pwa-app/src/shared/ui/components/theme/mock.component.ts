import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ThemeWrapper } from './theme.component';

@customElement('av-mock-theme')
export class MockComponent extends ThemeWrapper {
  static styles = css`
    :host {
      color: #345432;
    }

    :host([theme='dark']) {
      color: #ddd;
    }
  `;

  render() {
    return html`<div>
      <h3>test theme</h3>
      <button @click=${this._click}>toggle theme</button>
    </div>`;
  }

  /**
   * @description toggles theme between light and dark
   */
  _click() {
    const userPrefersDark = window.matchMedia('prefers-color-scheme: dark)').matches;
    const theme = localStorage.getItem('theme') || (userPrefersDark ? 'dark' : 'light');
    const toggledTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('theme', toggledTheme);
    localStorage.setItem('theme', toggledTheme);
  }
}
