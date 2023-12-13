import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';
import { ThemeService } from '../lib/theme.service';

@customElement('avx-theme-toggle-button')
export class AVXThemeToggleButton extends LitElement {
  render() {
    return html`<avx-button
      type="filled"
      label="Toggle Theme"
      @click=${this._toggleTheme}
    ></avx-button> `;
  }

  private _toggleTheme() {
    ThemeService.toggleTheme();
  }
}
