import { Route } from '@vaadin/router';
import { IAuthorizationRole } from '@project-x/model';

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
  label: string;
  private?: boolean;
  authorizedRoles?: IAuthorizationRole[];
};

// https://hilla.dev/docs/lit/guides/routing
// https://vaadin.github.io/router/vaadin-router/#/classes/Router
export const APPLICATION_ROUTES: ApplicationRoute[] = [
  { path: '/', component: 'avx-landing-page', label: 'Home' },
  { path: '/login', component: 'login-page', label: 'Login' },
  {
    path: '/playgrounds',
    component: 'playgrounds-page',
    private: true,
    authorizedRoles: ['admin', 'user', 'guest'],
    label: 'Playgrounds',
  },
  {
    path: '/opportunities',
    component: 'opportunity-list-page',
    private: true,
    label: 'Opportunities',
  },
  {
    path: '/opportunities/:id',
    component: 'opportunity-detail-page',
    private: true,
    label: 'Opportunity Detail',
  },
  { path: '/worker', component: 'av-worker-page', label: 'Worker' },
  { path: '/service-worker', component: 'av-service-worker-page', label: 'Service Worker' },
  { path: '(.*)', redirect: '/', label: 'Redirect' },
];
