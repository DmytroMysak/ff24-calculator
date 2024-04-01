<script setup lang="ts">
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { DEFAULT_LOCALE } from '@constants/global.constants';
import { useQuasar } from 'quasar';
import { ionCaretDownOutline } from '@quasar/extras/ionicons-v7';

const state: Record<string, { title: string; value: string }> = {
  'en-US': { title: '🇬🇧 EN', value: 'en-US' },
  uk: { title: '🇺🇦 UA', value: 'uk' },
};

const $q = useQuasar();
const currentLocale = useStorage('locale', DEFAULT_LOCALE, localStorage);
const { locale } = useI18n({ useScope: 'global' });
const locales = ref(Object.values(state));

/* webpackInclude: /(uk|en-US)\.mjs$/ */
const langList = import.meta.glob('../../../node_modules/quasar/lang/(en-US|uk).mjs');

async function localeChange(newLocale: string) {
  locale.value = newLocale;
  currentLocale.value = newLocale;

  const language = langList[`../../../node_modules/quasar/lang/${newLocale}.mjs`];
  if (typeof language === 'function') {
    await language().then((lang) => $q.lang.set(lang.default));
  } else {
    // eslint-disable-next-line no-console
    console.warn(`Quasar language file not found for ${newLocale}`);
  }
}
</script>

<template>
  <q-btn fab-mini flat :icon-right="ionCaretDownOutline" :label="state[currentLocale]?.title">
    <q-menu fit auto-close>
      <q-list>
        <q-item v-for="(item, index) in locales" :key="index" clickable @click="localeChange(item.value)">
          <q-item-section :lang="item.value">
            {{ item.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style scoped></style>
