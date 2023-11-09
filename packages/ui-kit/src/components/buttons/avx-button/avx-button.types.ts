export const AVX_BUTTON_TYPES = [
  'elevated',
  'filled',
  'filled-tonal',
  'outlined',
  'text',
  'icon',
] as const;

export const AVX_BUTTON_EMPHASIS = ['low', 'medium', 'high'] as const;

export type AVXButtonType = (typeof AVX_BUTTON_TYPES)[number];
export type AVXButtonEmphasis = (typeof AVX_BUTTON_EMPHASIS)[number];
