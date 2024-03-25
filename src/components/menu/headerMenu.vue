<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDark, useToggle } from '@vueuse/core';
import { useQuasar } from 'quasar';
import {
  ionCalculatorOutline,
  ionMoonOutline,
  ionSunnyOutline,
  ionInformationCircleOutline,
  ionHelpCircleOutline,
} from '@quasar/extras/ionicons-v7';
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
      <q-toolbar-title class="gt-sm cursor-pointer" @click="goTo('Home')">
        {{ $t('appName') }}
      </q-toolbar-title>

      <q-btn fab-mini flat :icon="ionCalculatorOutline" @click="goTo('Home')">
        <span> {{ $t('headerMenu.calculation') }} </span>
      </q-btn>

      <q-btn fab-mini flat :icon="ionHelpCircleOutline" @click="goTo('Instruction')">
        <span> {{ $t('headerMenu.instruction') }} </span>
      </q-btn>

      <q-space />

      <q-btn fab-mini flat :icon="ionInformationCircleOutline" @click="goTo('About')">
        <span class="gt-sm q-pl-xs"> {{ $t('aboutUs') }} </span>
      </q-btn>

      <q-btn fab-mini flat :icon="nextTheme.icon" @click="toggleDark()">
        <span class="gt-sm q-pl-xs"> {{ $t(`headerMenu.${nextTheme.theme}`) }} </span>
      </q-btn>

      <HeaderMenuLocale />
    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
