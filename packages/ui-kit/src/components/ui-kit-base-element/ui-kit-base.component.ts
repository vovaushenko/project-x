import { LitElement } from 'lit';
import { LoggerController } from '../../controllers/Logger.controller';
import { property } from 'lit/decorators.js';
import { UI_KIT_DESIGN_SYSTEM } from '../../design-system/tokens/tokens';
import { Maybe, UiKitTheme } from '../../shared/types';
import { UI_KIT_THEME_NAMESPACE } from '../../design-system/lib/theme.constants';
import { UiKitThemeUtils } from '../../design-system/lib/theme.utils';

export class UiKitBaseElement extends LitElement {
  static styles = UI_KIT_DESIGN_SYSTEM;

  @property({ reflect: true })
  public theme: Maybe<UiKitTheme> = null;

  protected _themeObserver: Maybe<MutationObserver> = null;

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    new LoggerController(this);
    UiKitThemeUtils.getAndSetInitialTheme(this.theme);
    this._instantiateThemeObserver();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._disconnectThemeObserver();
  }

  private _instantiateThemeObserver(): void {
    this._themeObserver = new MutationObserver(() => {
      const appliedTheme = UiKitThemeUtils.getCurrentlyAppliedTheme();
      if (UiKitThemeUtils.isSupportedTheme(appliedTheme)) {
        this.theme = appliedTheme;
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
