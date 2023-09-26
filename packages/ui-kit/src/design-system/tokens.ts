import { css } from 'lit';

export const designSystemTokens = css`
  @media (prefers-color-scheme: light) {
    :host {
      --av-primary-text-color: black;
    }
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --av-primary-text-color: white;
    }
  }

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
