<script setup lang="ts">
import { inject } from '@vercel/analytics';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { onMounted } from 'vue';
import HeaderMenu from './components/menu/headerMenu.vue';

onMounted(() => inject());
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <HeaderMenu />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <SpeedInsights />
</template>
