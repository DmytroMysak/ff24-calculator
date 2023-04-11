import type { RouteLocationRaw } from 'vue-router';

// TODO add icons

export type Breadcrumb = {
  title: string;
  disabled?: boolean;
  to: RouteLocationRaw;
};
