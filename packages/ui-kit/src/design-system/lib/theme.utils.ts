import { Maybe, UiKitTheme } from '../../shared/types';
import { SUPPORTED_THEMES, UI_KIT_THEME_NAMESPACE } from './theme.constants';

function _setCurrentTheme(theme: UiKitTheme) {
  if (isSupportedTheme(theme)) {
    document.documentElement.setAttribute(UI_KIT_THEME_NAMESPACE, theme);
  } else {
    console.warn(`Theme - ${theme} is not supported by ui-kit`);
  }
}

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

  _setCurrentTheme(toggledTheme);
  localStorage.setItem(UI_KIT_THEME_NAMESPACE, toggledTheme);
}

function getAndSetInitialTheme(reactiveThemeVariable: Maybe<UiKitTheme>) {
  const persistedTheme = localStorage.getItem(UI_KIT_THEME_NAMESPACE);
  const userPrefersDarkTheme = window.matchMedia('prefers-color-scheme: dark)').matches;

  if (persistedTheme) {
    if (isSupportedTheme(persistedTheme)) {
      _setCurrentTheme(persistedTheme);
      reactiveThemeVariable = persistedTheme;
    } else {
      console.warn(`Persisted theme - ${persistedTheme} is not supported by ui-kit`);
      if (userPrefersDarkTheme) {
        _setCurrentTheme('avx-green-dark');
        reactiveThemeVariable = 'avx-green-dark';
      } else {
        _setCurrentTheme('avx-green-light');
        reactiveThemeVariable = 'avx-green-light';
      }
    }
  } else {
    if (userPrefersDarkTheme) {
      _setCurrentTheme('avx-green-dark');
      reactiveThemeVariable = 'avx-green-dark';
    } else {
      _setCurrentTheme('avx-green-light');
      reactiveThemeVariable = 'avx-green-light';
    }
  }
}

function _isDarkTheme(themeName: UiKitTheme) {
  return themeName.includes('dark');
}

export const UiKitThemeUtils = {
  isSupportedTheme,
  getCurrentlyAppliedTheme,
  toggleTheme,
  getAndSetInitialTheme,
};
