import { SUPPORTED_THEMES } from './constants';

export type Maybe<T> = T | null;

export type UiKitTheme = (typeof SUPPORTED_THEMES)[number];
