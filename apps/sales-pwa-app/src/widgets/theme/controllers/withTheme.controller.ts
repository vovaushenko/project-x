import { Maybe } from '@project-x/common';
import { ReactiveController } from 'lit';
import { ThemeService } from '../lib/theme.service';
import { UI_KIT_THEME_NAMESPACE } from '@project-x/ui-kit';
import { SalesApp } from '../../..';

export class WithTheme implements ReactiveController {
  private host: SalesApp;
  protected _themeObserver: Maybe<MutationObserver> = null;

  constructor(host: SalesApp) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    this._getAndSetInitialTheme();
    this._instantiateThemeObserver();
  }
  hostDisconnected(): void {
    this._disconnectThemeObserver();
  }

  private _getAndSetInitialTheme() {
    ThemeService.getAndSetInitialTheme(this.host.theme);
  }

  private _instantiateThemeObserver(): void {
    this._themeObserver = new MutationObserver(() => {
      const appliedTheme = ThemeService.getCurrentlyAppliedTheme();
      if (ThemeService.isSupportedTheme(appliedTheme)) {
        this.host.theme = appliedTheme;
      } else {
        console.warn(`Current theme - ${appliedTheme} is not supported by ui-kit`);
      }
    });

    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [UI_KIT_THEME_NAMESPACE],
    });
  }

  private _disconnectThemeObserver(): void {
    this._themeObserver?.disconnect();
  }
}
