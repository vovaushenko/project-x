import { Maybe } from '@project-x/common';
import { ApplicationRoute } from './router.routes';

export const RouterUtils = {
  isPrivateRoute: function isPrivateRoute(route: Maybe<ApplicationRoute>) {
    if (!route) {
      return false;
    }
    return route.private ?? false;
  },
};
