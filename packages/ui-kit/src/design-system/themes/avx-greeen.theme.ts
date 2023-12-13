import { css } from 'lit';

const greenLightThemeColors = css`
  @media (prefers-color-scheme: light) {
    :host {
      --avx-theme-color-on-surface-variant-2: linear-gradient(
        0deg,
        rgba(67, 73, 62, 0.08),
        rgba(67, 73, 62, 0.08)
      );
      --avx-theme-color-on-surface-variant-4: linear-gradient(
        0deg,
        rgba(67, 73, 62, 0.12),
        rgba(67, 73, 62, 0.12)
      );
      --avx-theme-color-on-surface-2: linear-gradient(
          0deg,
          rgba(26, 28, 24, 0.08),
          rgba(26, 28, 24, 0.08)
        ),
        var(--avx-theme-color-secondary-container);
      --avx-theme-color-on-surface-4: linear-gradient(
          0deg,
          rgba(26, 28, 24, 0.12),
          rgba(26, 28, 24, 0.12)
        ),
        var(--avx-theme-color-secondary-container);
      --avx-theme-color-white: #fff;
      --avx-theme-color-on-background: #1a1c18;
      --avx-theme-color-background: #fdfdf6;
      --avx-theme-color-on-surface: #1a1c18;
      --avx-theme-color-on-surface-variant: #43493e;
      --avx-theme-color-surface-0: #fdfdf6;
      --avx-theme-color-surface-variant: #dfe4d6;
      --avx-theme-color-inverse-surface: #2f312c;
      --avx-theme-color-inverse-on-surface: #f1f1ea;
      --avx-theme-color-primary: #386a20;
      --avx-theme-color-primary-80: #9cd67d;
      --avx-theme-color-primary-30: #205107;
      --avx-theme-color-primary-20: #0c3900;
      --avx-theme-color-on-primary: #fff;
      --avx-theme-color-primary-container: #b8f397;
      --avx-theme-color-on-primary-container: #042100;
      --avx-theme-color-secondary: #55624c;
      --avx-theme-color-on-secondary: #fff;
      --avx-theme-color-secondary-container: #d9e7cb;
      --avx-theme-color-on-secondary-container: #131f0d;
      --avx-theme-color-tertiary-container: #bbebeb;
      --avx-theme-color-on-tertiary-container: #002021;
      --avx-theme-color-utility-error: #ba1b1b;
      --avx-theme-color-utility-on-error: #fff;
      --avx-theme-color-utility-outline: #74796e;
      --avx-theme-color-surface-1: #f0f3e8;
      --avx-theme-color-surface-2: #ebefe2;
      --avx-theme-color-surface-3: #e5eadc;
      --avx-theme-color-surface-4: #e3e9da;
      --avx-theme-color-surface-5: #dfe6d5;
      --avx-theme-color-ref-secondary-200: #bdcbb0;
      --avx-theme-color-ref-secondary-300: #a1b095;
      --avx-theme-color-ref-neutral-100: #e3e3e3;
      --avx-theme-color-ref-neutral-200: #c7c7c7;
    }
  }

  :host([theme='avx-green-light']) {
    --avx-theme-color-on-surface-variant-2: linear-gradient(
      0deg,
      rgba(67, 73, 62, 0.08),
      rgba(67, 73, 62, 0.08)
    );
    --avx-theme-color-on-surface-variant-4: linear-gradient(
      0deg,
      rgba(67, 73, 62, 0.12),
      rgba(67, 73, 62, 0.12)
    );
    --avx-theme-color-on-surface-2: linear-gradient(
        0deg,
        rgba(26, 28, 24, 0.08),
        rgba(26, 28, 24, 0.08)
      ),
      var(--avx-theme-color-secondary-container);
    --avx-theme-color-on-surface-4: linear-gradient(
        0deg,
        rgba(26, 28, 24, 0.12),
        rgba(26, 28, 24, 0.12)
      ),
      var(--avx-theme-color-secondary-container);
    --avx-theme-color-white: #fff;
    --avx-theme-color-on-background: #1a1c18;
    --avx-theme-color-background: #fdfdf6;
    --avx-theme-color-on-surface: #1a1c18;
    --avx-theme-color-on-surface-variant: #43493e;
    --avx-theme-color-surface-0: #fdfdf6;
    --avx-theme-color-surface-variant: #dfe4d6;
    --avx-theme-color-inverse-surface: #2f312c;
    --avx-theme-color-inverse-on-surface: #f1f1ea;
    --avx-theme-color-primary: #386a20;
    --avx-theme-color-primary-80: #9cd67d;
    --avx-theme-color-primary-30: #205107;
    --avx-theme-color-primary-20: #0c3900;
    --avx-theme-color-on-primary: #fff;
    --avx-theme-color-primary-container: #b8f397;
    --avx-theme-color-on-primary-container: #042100;
    --avx-theme-color-secondary: #55624c;
    --avx-theme-color-on-secondary: #fff;
    --avx-theme-color-secondary-container: #d9e7cb;
    --avx-theme-color-on-secondary-container: #131f0d;
    --avx-theme-color-tertiary-container: #bbebeb;
    --avx-theme-color-on-tertiary-container: #002021;
    --avx-theme-color-utility-error: #ba1b1b;
    --avx-theme-color-utility-on-error: #fff;
    --avx-theme-color-utility-outline: #74796e;
    --avx-theme-color-surface-1: #f0f3e8;
    --avx-theme-color-surface-2: #ebefe2;
    --avx-theme-color-surface-3: #e5eadc;
    --avx-theme-color-surface-4: #e3e9da;
    --avx-theme-color-surface-5: #dfe6d5;
    --avx-theme-color-ref-secondary-200: #bdcbb0;
    --avx-theme-color-ref-secondary-300: #a1b095;
    --avx-theme-color-ref-neutral-100: #e3e3e3;
    --avx-theme-color-ref-neutral-200: #c7c7c7;
  }
`;
const greenDarkThemeColors = css`
  @media (prefers-color-scheme: dark) {
    :host {
      --avx-theme-color-on-surface-variant-2: linear-gradient(
        0deg,
        rgba(196, 200, 187, 0.08),
        rgba(196, 200, 187, 0.08)
      );
      --avx-theme-color-on-surface-variant-4: linear-gradient(
        0deg,
        rgba(196, 200, 187, 0.12),
        rgba(196, 200, 187, 0.12)
      );
      --avx-theme-color-on-surface-2: linear-gradient(
          0deg,
          rgba(227, 227, 220, 0.08),
          rgba(227, 227, 220, 0.08)
        ),
        var(--avx-theme-color-secondary-container);
      --avx-theme-color-on-surface-4: linear-gradient(
          0deg,
          rgba(227, 227, 220, 0.12),
          rgba(227, 227, 220, 0.12)
        ),
        var(--avx-theme-color-secondary-container);
      --avx-theme-color-white: #fff;
      --avx-theme-color-on-background: #e3e3dc;
      --avx-theme-color-background: #1a1c18;
      --avx-theme-color-on-surface: #e3e3dc;
      --avx-theme-color-on-surface-variant: #c4c8bb;
      --avx-theme-color-surface-0: #1a1c18;
      --avx-theme-color-surface-variant: #43493e;
      --avx-theme-color-surface-1: #232820;
      --avx-theme-color-surface-2: #272e23;
      --avx-theme-color-surface-3: #2b3326;
      --avx-theme-color-surface-4: #2c3527;
      --avx-theme-color-surface-5: #2f3929;
      --avx-theme-color-inverse-surface: #2f312c;
      --avx-theme-color-inverse-on-surface: #f1f1ea;
      --avx-theme-color-primary: #9cd67d;
      --avx-theme-color-primary-80: #9cd67d;
      --avx-theme-color-primary-30: #205107;
      --avx-theme-color-primary-20: #0c3900;
      --avx-theme-color-neutral-10: #1a1c18;
      --avx-theme-color-neutral-90: #e3e3dc;
      --avx-theme-color-on-primary: #0c3900;
      --avx-theme-color-primary-container: #205107;
      --avx-theme-color-on-primary-container: #b8f397;
      --avx-theme-color-secondary: #bdcbb0;
      --avx-theme-color-on-secondary: #273420;
      --avx-theme-color-secondary-container: #3e4a36;
      --avx-theme-color-on-secondary-container: #d9e7cb;
      --avx-theme-color-tertiary-container: #1e4e4e;
      --avx-theme-color-on-tertiary-container: #bbebeb;
      --avx-theme-color-utility-error: #ffb4a9;
      --avx-theme-color-utility-on-error: #680003;
      --avx-theme-color-utility-outline: #8d9286;
    }
  }

  :host([theme='avx-green-dark']) {
    --avx-theme-color-on-surface-variant-2: linear-gradient(
      0deg,
      rgba(196, 200, 187, 0.08),
      rgba(196, 200, 187, 0.08)
    );
    --avx-theme-color-on-surface-variant-4: linear-gradient(
      0deg,
      rgba(196, 200, 187, 0.12),
      rgba(196, 200, 187, 0.12)
    );
    --avx-theme-color-on-surface-2: linear-gradient(
        0deg,
        rgba(227, 227, 220, 0.08),
        rgba(227, 227, 220, 0.08)
      ),
      var(--avx-theme-color-secondary-container);
    --avx-theme-color-on-surface-4: linear-gradient(
        0deg,
        rgba(227, 227, 220, 0.12),
        rgba(227, 227, 220, 0.12)
      ),
      var(--avx-theme-color-secondary-container);
    --avx-theme-color-white: #fff;
    --avx-theme-color-on-background: #e3e3dc;
    --avx-theme-color-background: #1a1c18;
    --avx-theme-color-on-surface: #e3e3dc;
    --avx-theme-color-on-surface-variant: #c4c8bb;
    --avx-theme-color-surface-0: #1a1c18;
    --avx-theme-color-surface-variant: #43493e;
    --avx-theme-color-surface-1: #232820;
    --avx-theme-color-surface-2: #272e23;
    --avx-theme-color-surface-3: #2b3326;
    --avx-theme-color-surface-4: #2c3527;
    --avx-theme-color-surface-5: #2f3929;
    --avx-theme-color-inverse-surface: #2f312c;
    --avx-theme-color-inverse-on-surface: #f1f1ea;
    --avx-theme-color-primary: #9cd67d;
    --avx-theme-color-primary-80: #9cd67d;
    --avx-theme-color-primary-30: #205107;
    --avx-theme-color-primary-20: #0c3900;
    --avx-theme-color-neutral-10: #1a1c18;
    --avx-theme-color-neutral-90: #e3e3dc;
    --avx-theme-color-on-primary: #0c3900;
    --avx-theme-color-primary-container: #205107;
    --avx-theme-color-on-primary-container: #b8f397;
    --avx-theme-color-secondary: #bdcbb0;
    --avx-theme-color-on-secondary: #273420;
    --avx-theme-color-secondary-container: #3e4a36;
    --avx-theme-color-on-secondary-container: #d9e7cb;
    --avx-theme-color-tertiary-container: #1e4e4e;
    --avx-theme-color-on-tertiary-container: #bbebeb;
    --avx-theme-color-utility-error: #ffb4a9;
    --avx-theme-color-utility-on-error: #680003;
    --avx-theme-color-utility-outline: #8d9286;
  }
`;

export const greenThemeColors = [greenLightThemeColors, greenDarkThemeColors];
