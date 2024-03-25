import type { RouterOptions } from 'vue-router';

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/calculation/calculationPage.vue'),
  },
  {
    path: '/instruction',
    name: 'Instruction',
    component: () => import('../components/instruction/instructionPage.vue'),
  },

  {
    path: '/about',
    name: 'About',
    component: () => import('../components/aboutPage.vue'),
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
