<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDark, useToggle } from '@vueuse/core';
import { useQuasar } from 'quasar';
// import { MenuService } from '@services/menu.service';
import HeaderMenuLocale from './headerMenuLocale.vue';

const state = {
  dark: {
    icon: 'mdi-weather-night',
    theme: 'dark',
  },
  light: {
    icon: 'mdi-weather-sunny',
    theme: 'light',
  },
};
// const { toggleMenu } = MenuService();
const router = useRouter();
const $q = useQuasar();
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
      <!-- <q-btn v-if="isLoggedIn" flat dense round icon="mdi-menu" aria-label="Menu" @click="toggleMenu" /> -->

      <q-toolbar-title class="gt-sm cursor-pointer" @click="goTo('Home')">
        {{ $t('appName') }}
      </q-toolbar-title>

      <q-btn fab-mini flat icon="mdi-calculator" @click="goTo('Home')">
        <span> {{ $t('headerMenu.calculation') }} </span>
      </q-btn>

      <q-space />

      <q-btn fab-mini flat icon="mdi-information-variant" @click="goTo('About')">
        <span class="gt-sm q-pl-xs"> {{ $t('aboutUs') }} </span>
      </q-btn>

      <q-btn fab-mini flat :icon="nextTheme.icon" @click="toggleDark()">
        <span class="gt-sm q-pl-xs"> {{ $t(`headerMenu.${nextTheme.theme}`) }} </span>
      </q-btn>

      <HeaderMenuLocale />

      <!-- <q-btn v-if="!isLoggedIn" fab-mini flat icon="mdi-login-variant" @click="goTo('Login')">
        <span class="gt-sm q-pl-xs"> {{ $t('login') }} </span>
      </q-btn>

      <q-btn v-if="isLoggedIn" fab-mini flat icon="mdi-logout-variant" @click="logout">
        <span class="gt-sm q-pl-xs"> {{ $t('headerMenu.logout') }} </span>
      </q-btn> -->
    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
