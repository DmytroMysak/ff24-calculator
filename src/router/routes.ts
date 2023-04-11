import { RouterOptions } from 'vue-router';
import type { Breadcrumb } from '@types';
import type { ComposerTranslation } from 'vue-i18n';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/calculationPage.vue'),
    meta: { breadcrumb: () => [] },
  },

  {
    path: '/about',
    name: 'About',
    component: () => import('../components/aboutPage.vue'),
    meta: { breadcrumb: () => [] },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: 'NotFound',
    path: '/:catchAll(.*)*',
    component: () => import('components/errorNotFound.vue'),
  },
];

export default routes;

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumb: (route: RouteLocationNormalizedLoaded, t: ComposerTranslation) => Breadcrumb[];
  }
}
