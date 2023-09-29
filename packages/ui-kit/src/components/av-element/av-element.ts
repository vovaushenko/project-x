import { LitElement } from 'lit';
import { LoggerController } from '../../controllers/Logger.controller';
import { AV_X_DESIGN_SYSTEM } from '../../design-system/tokens';
import { state } from 'lit/decorators.js';
import { Maybe, UiKitTheme } from '../../shared/types';
import { isSupportedTheme } from '../../shared/utils';
import { AV_UI_KIT_THEME_NAMESPACE } from '../../shared/constants';

export class AvElement extends LitElement {
  static styles = AV_X_DESIGN_SYSTEM;

  @state() public theme: Maybe<UiKitTheme> = null;

  protected _themeObserver: Maybe<MutationObserver> = null;

  constructor() {
    super();
    console.log(`AV Element: ${this.constructor.name} is constructed`);
  }

  connectedCallback(): void {
    super.connectedCallback();
    new LoggerController(this);
    this._instantiateThemeObserver();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._disconnectThemeObserver();
  }

  private _instantiateThemeObserver(): void {
    this._themeObserver = new MutationObserver(() => {
      const appliedTheme = document.documentElement.getAttribute(AV_UI_KIT_THEME_NAMESPACE);
      if (isSupportedTheme(appliedTheme)) {
        this.theme = appliedTheme;
      } else {
        console.warn(`Current theme - ${appliedTheme} is not supported by ui-kit`);
      }
    });

    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [AV_UI_KIT_THEME_NAMESPACE],
    });
  }

  private _disconnectThemeObserver(): void {
    this._themeObserver?.disconnect();
  }
}
