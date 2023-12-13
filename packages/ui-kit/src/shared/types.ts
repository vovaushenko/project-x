import { SUPPORTED_THEMES } from '../design-system/lib/theme.constants';

export type Maybe<T> = T | null;

export type UiKitTheme = (typeof SUPPORTED_THEMES)[number];
