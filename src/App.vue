<script setup lang="ts">
import { inject } from '@vercel/analytics';
import { onMounted } from 'vue';
import HeaderMenu from './components/menu/headerMenu.vue';
// import LeftMenu from './components/menu/leftMenu.vue';
// import Breadcrumbs from './components/breadcrumbBar.vue';
import { reportWebVitals } from './utils/vitals';

onMounted(() => {
  reportWebVitals();
  inject();
});
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <HeaderMenu />

    <!-- <LeftMenu /> -->

    <q-page-container>
      <!-- <Breadcrumbs /> -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>
