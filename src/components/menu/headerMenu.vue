<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDark, useToggle } from '@vueuse/core';
import { useQuasar } from 'quasar';
import {
  ionMoonOutline,
  ionSunnyOutline,
  ionInformationCircleOutline,
  ionMenuOutline,
} from '@quasar/extras/ionicons-v7';
import { MenuService } from '@services/menu.service';
import HeaderMenuLocale from './headerMenuLocale.vue';

const state = {
  dark: {
    icon: ionMoonOutline,
    theme: 'dark',
  },
  light: {
    icon: ionSunnyOutline,
    theme: 'light',
  },
};
const router = useRouter();
const $q = useQuasar();
const { toggleMenu } = MenuService();
const nextTheme = ref(state.dark);

const isDark = useDark({
  onChanged(dark: boolean) {
    $q.dark.set(dark);
    nextTheme.value = dark ? state.light : state.dark;
  },
});
const toggleDark = useToggle(isDark);

function goTo(name: string) {
  router.push({ name });
}
</script>

<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round :icon="ionMenuOutline" aria-label="Menu" @click="toggleMenu" />

      <q-toolbar-title class="gt-sm cursor-pointer" @click="goTo('Home')">
        {{ $t('appName') }}
      </q-toolbar-title>

      <q-space />

      <q-btn fab-mini flat :icon="ionInformationCircleOutline" @click="goTo('About')">
        <span class="gt-sm q-pl-xs"> {{ $t('menu.aboutUs') }} </span>
      </q-btn>

      <q-btn fab-mini flat :icon="nextTheme.icon" @click="toggleDark()">
        <span class="gt-sm q-pl-xs"> {{ $t(`menu.${nextTheme.theme}`) }} </span>
      </q-btn>

      <HeaderMenuLocale />
    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
