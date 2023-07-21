<script setup lang="ts">
import { inject } from '@vercel/analytics';
import { onMounted } from 'vue';
import HeaderMenu from './components/menu/headerMenu.vue';
// import Breadcrumbs from './components/breadcrumbBar.vue';

onMounted(() => inject());
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <HeaderMenu />

    <q-page-container>
      <!-- <Breadcrumbs /> -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>
