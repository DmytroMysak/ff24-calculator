import { createGlobalState } from '@vueuse/core';
import { ref } from 'vue';

export const MenuService = createGlobalState(() => {
  const isShowLeftMenu = ref(true);

  function toggleMenu() {
    isShowLeftMenu.value = !isShowLeftMenu.value;
  }

  return { isShowLeftMenu, toggleMenu };
});
