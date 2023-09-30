import { css } from 'lit';

const aspectRatio = css`
  :host {
    --r-square: 1/1;
    --r-portrait: 3/4;
    --r-landscape: 4/3;
    --r-tall: 2/3;
    --r-wide: 3/2;
    --r-widescreen: 16/9;
    --r-golden: 1.618/1;
  }
`;

export const zindex = css`
  :host {
    --z-base: 5;
    --z-1: calc(var(--z-base) * 1);
    --z-2: calc(var(--z-base) * 2);
    --z-3: calc(var(--z-base) * 3);
    --z-4: calc(var(--z-base) * 4);
    --z-5: calc(var(--z-base) * 5);
  }
`;

export const a11y = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    :host,
    ::before,
    ::after {
      animation-delay: -1ms !important;
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      background-attachment: initial !important;
      scroll-behavior: auto !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
  }
`;

export const fontSize = css`
  :host {
    --fs-1: 0.512rem;
    --fs-2: 0.64rem;
    --fs-3: 0.8rem;
    --fs-4: 1rem;
    --fs-5: 1.25rem;
    --fs-6: 1.563rem;
    --fs-7: 0.953rem;
    --fs-8: 2.441rem;
    --fs-9: 3.052rem;
    --fs-icon: 1.5rem;
  }
`;

const fontWeight = css`
  :host {
    --fw-light: 300;
    --fw-normal: 400;
    --fw-medium: 500;
    --fw-semibold: 600;
    --fw-bold: 700;
    --fw-extrabold: 800;
    --fw-black: 900;
  }
`;

const spacing = css`
  @media (width < 768px) {
    :host {
      --space-0: 0rem;
      --space-1: 0.1rem;
      --space-2: 0.2rem;
      --space-3: 0.4rem;
      --space-4: 0.65rem;
      --space-5: 1rem;
      --space-6: 1.15rem;
      --space-7: 1.5rem;
      --space-8: 1.75rem;
      --space-9: 2rem;
    }
  }

  @media (width < 1024px) and (width >= 768px) {
    :host {
      --space-0: 0rem;
      --space-1: 0.25rem;
      --space-2: 0.5rem;
      --space-3: 0.75rem;
      --space-4: 1rem;
      --space-5: 1.5rem;
      --space-6: 1.75rem;
      --space-7: 2.25rem;
      --space-8: 3rem;
      --space-9: 4.5rem;
    }
  }

  @media (width >= 1024px) {
    :host {
      --space-0: 0rem;
      --space-1: 0.25rem;
      --space-2: 0.5rem;
      --space-3: 0.75rem;
      --space-4: 1rem;
      --space-5: 1.5rem;
      --space-6: 1.75rem;
      --space-7: 2.25rem;
      --space-8: 3rem;
      --space-9: 4.5rem;
    }
  }
`;

const borderRadus = css`
  :host {
    --radius-1: 4px;
    --radius-2: 6px;
    --radius-3: 8px;
    --radius-4: 10px;
    --radius-5: 12px;
    --radius-100: 100%;
    --radius-full: 9999px;
  }
`;

const width = css`
  :host {
    --width-xs: 480px;
    --width-sm: 640px;
    --width-md: 768px;
    --width-lg: 1024px;
    --width-xl: 1280px;
  }
`;

export const colors = css`
  @media (prefers-color-scheme: light) {
    :host {
      --av-primary-text-color: white;
    }
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --av-primary-text-color: dark;
    }
  }
`;

export const AV_X_DESIGN_SYSTEM = [
  aspectRatio,
  fontSize,
  colors,
  fontWeight,
  spacing,
  borderRadus,
  width,
  zindex,
  a11y,
];
