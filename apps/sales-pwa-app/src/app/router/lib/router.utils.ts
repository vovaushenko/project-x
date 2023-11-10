import { Maybe } from '../../../shared/types';
import { ApplicationRoute } from './router.routes';

export const RouterUtils = {
  isPrivateRoute: function isPrivateRoute(route: Maybe<ApplicationRoute>) {
    if (!route) {
      return false;
    }
    return route.private ?? false;
  },
};
