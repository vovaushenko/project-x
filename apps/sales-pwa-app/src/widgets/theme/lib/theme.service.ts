import { UiKitThemeUtils } from '@project-x/ui-kit';

export const ThemeService = {
  getCurrentlyAppliedTheme: UiKitThemeUtils.getCurrentlyAppliedTheme,
  isSupportedTheme: UiKitThemeUtils.isSupportedTheme,
  getAndSetInitialTheme: UiKitThemeUtils.getAndSetInitialTheme,
  toggleTheme: UiKitThemeUtils.toggleTheme,
};
