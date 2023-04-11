import { createGlobalState } from '@vueuse/core';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Breadcrumb } from '@types';
import { useI18n } from 'vue-i18n';

export const BreadcrumbService = createGlobalState(() => {
  const { t } = useI18n({ useScope: 'global' });
  const items = ref<Breadcrumb[]>();

  function onMountedBreadcrumbs(): void {
    const router = useRouter();

    router.afterEach((to) => {
      if (typeof to.meta?.breadcrumb === 'function') {
        items.value = to.meta.breadcrumb(to, t);
      }
    });
  }

  // TODO refactor this logic
  function updateTitle(index: number, title: string): void {
    if (items.value && items.value[index]) {
      items.value[index].title = title;
    }
  }

  return { onMountedBreadcrumbs, updateTitle, items };
});
