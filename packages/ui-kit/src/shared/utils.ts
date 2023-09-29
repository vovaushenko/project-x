import { SUPPORTED_THEMES } from './constants';
import { UiKitTheme } from './types';

export function isSupportedTheme(theme: unknown): theme is UiKitTheme {
  return SUPPORTED_THEMES.includes(theme as UiKitTheme);
}
