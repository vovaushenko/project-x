import { describe, expect, it } from 'vitest';
import { ApplicationRoute } from '../router.routes';
import { RouterUtils } from '../router.utils';
describe('Router Utils', () => {
  describe('isPrivateRoute', () => {
    it('should return false if route is undefined', () => {
      const route = null;
      expect(RouterUtils.isPrivateRoute(route)).toBe(false);
    });

    it('should return false if route is not private', () => {
      const route: ApplicationRoute = { path: '/', component: 'av-landing-page' };
      expect(RouterUtils.isPrivateRoute(route)).toBe(false);
    });

    it('should return true if route is private', () => {
      const route: ApplicationRoute = {
        path: '/opportunities',
        component: 'opportunity-list-page',
        private: true,
      };
      expect(RouterUtils.isPrivateRoute(route)).toBe(true);
    });
  });
});
