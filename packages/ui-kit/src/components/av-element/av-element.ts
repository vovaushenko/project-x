import { LitElement } from 'lit';
import { LoggerController } from '../../controllers/Logger.controller';
import { AV_X_DESIGN_SYSTEM } from '../../design-system/tokens';
import { state } from 'lit/decorators.js';
import { Maybe, UiKitTheme } from '../../shared/types';

export class AvElement extends LitElement {
  static styles = AV_X_DESIGN_SYSTEM;

  @state() protected _registredElements: AvElement[] = [];
  @state() public theme: UiKitTheme = null;

  protected _themeObserver: Maybe<MutationObserver> = null;

  constructor() {
    super();
    this._registredElements.push(this);
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
      this._registredElements.forEach((element) => {
        element.theme = document.documentElement.getAttribute('theme') as UiKitTheme;
      });
    });

    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['theme'],
    });
  }

  private _disconnectThemeObserver(): void {
    this._themeObserver?.disconnect();
  }
}
