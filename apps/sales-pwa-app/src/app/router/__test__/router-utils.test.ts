import { describe, expect, it } from 'vitest';
import { ApplicationRoute } from '../lib/router.routes';
import { RouterUtils } from '../lib/router.utils';
describe('Router Utils', () => {
  describe('isPrivateRoute', () => {
    it('should return false if route is undefined', () => {
      const route = null;
      expect(RouterUtils.isPrivateRoute(route)).toBe(false);
    });

    it('should return false if route is not private', () => {
      const route: ApplicationRoute = { path: '/', component: 'av-landing-page', label: 'Home' };
      expect(RouterUtils.isPrivateRoute(route)).toBe(false);
    });

    it('should return true if route is private', () => {
      const route: ApplicationRoute = {
        path: '/opportunities',
        component: 'opportunity-list-page',
        private: true,
        label: 'Opportunities',
      };
      expect(RouterUtils.isPrivateRoute(route)).toBe(true);
    });
  });
});
