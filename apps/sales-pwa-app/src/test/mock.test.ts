import { beforeEach, describe, expect, it, vi } from 'vitest';

import '../pages/landing.page';

describe('Landing page mock test', async () => {
  function getInsideLandingPageBtn(): HTMLElement | null | undefined {
    return document
      .querySelector('av-landing-page')
      ?.shadowRoot?.querySelector('button');
  }
  beforeEach(async () => {
    document.body.innerHTML = '<av-landing-page></av-landing-page>';
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (getInsideLandingPageBtn()) {
          clearInterval(interval);
          resolve();
        }
      });
    });
  });

  it('should show log button', () => {
    expect(
      document.querySelector('av-landing-page')?.shadowRoot?.innerHTML
    ).toContain('Sales PWA Landing Page');
  });

  it('should dispatch logger event on logger button click', () => {
    const spyClick = vi.fn();
    document
      .querySelector('av-landing-page')
      ?.addEventListener('logger', spyClick);
    getInsideLandingPageBtn()?.click();
    expect(spyClick).toHaveBeenCalled();
  });
});
