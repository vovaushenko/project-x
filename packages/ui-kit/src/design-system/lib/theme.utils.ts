import { Maybe, UiKitTheme } from '../../shared/types';
import { SUPPORTED_THEMES, UI_KIT_THEME_NAMESPACE } from './theme.constants';

function isSupportedTheme(theme: unknown): theme is UiKitTheme {
  return SUPPORTED_THEMES.includes(theme as UiKitTheme);
}

function getCurrentlyAppliedTheme(): unknown {
  const appliedTheme = document.documentElement.getAttribute(UI_KIT_THEME_NAMESPACE);
  return appliedTheme;
}

function toggleTheme() {
  const userPrefersDarkTheme = window.matchMedia('prefers-color-scheme: dark)').matches;

  let theme: Maybe<UiKitTheme> = null;

  const persistedTheme = localStorage.getItem(UI_KIT_THEME_NAMESPACE);

  if (persistedTheme) {
    theme = persistedTheme as UiKitTheme;
  } else {
    theme = userPrefersDarkTheme ? 'avx-green-dark' : 'avx-green-light';
  }

  const toggledTheme = _isDarkTheme(theme) ? 'avx-green-light' : 'avx-green-dark';

  document.documentElement.setAttribute(UI_KIT_THEME_NAMESPACE, toggledTheme);
  localStorage.setItem(UI_KIT_THEME_NAMESPACE, toggledTheme);
}

function _isDarkTheme(themeName: UiKitTheme) {
  return themeName.includes('dark');
}

export const UiKitThemeUtils = { isSupportedTheme, getCurrentlyAppliedTheme, toggleTheme };
