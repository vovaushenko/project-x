export const routes = [
  { path: '/', component: 'av-landing-page' },
  { path: '/login', component: 'login-page' },
  { path: '/playgrounds', component: 'playgrounds-page' },
  { path: '/opportunities', component: 'opportunity-list-page' },
  { path: '/opportunities/:id', component: 'opportunity-detail-page' },
  { path: '(.*)', redirect: '/' },
];
