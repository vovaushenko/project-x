import { Route } from '@vaadin/router';
import { IAVXUserRole } from '../../../../packages/sales-model';

export type ApplicationPath =
  | '/'
  | '/login'
  | '/playgrounds'
  | '/opportunities'
  | `/opportunities/${string}`
  | '/worker'
  | '/service-worker'
  | '(.*)';

export type ApplicationRoute = Route & {
  path: ApplicationPath;
  private?: boolean;
  authorizedRoles?: IAVXUserRole[];
};

// https://hilla.dev/docs/lit/guides/routing
// https://vaadin.github.io/router/vaadin-router/#/classes/Router
export const routes: ApplicationRoute[] = [
  { path: '/', component: 'av-landing-page' },
  { path: '/login', component: 'login-page' },
  {
    path: '/playgrounds',
    component: 'playgrounds-page',
    private: true,
    authorizedRoles: ['admin', 'user', 'guest'],
  },
  { path: '/opportunities', component: 'opportunity-list-page', private: true },
  { path: '/opportunities/:id', component: 'opportunity-detail-page', private: true },
  { path: '/worker', component: 'av-worker-page' },
  { path: '/service-worker', component: 'av-service-worker-page' },
  { path: '(.*)', redirect: '/' },
];
