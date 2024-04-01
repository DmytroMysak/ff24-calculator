<script setup lang="ts">
import {
  ionCalculatorOutline,
  ionHelpCircleOutline,
  ionInformationCircleOutline,
  ionStatsChartOutline,
  ionBugOutline,
} from '@quasar/extras/ionicons-v7';
import { MenuService } from '@services/menu.service';
import { APP_VERSION } from '@constants/global.constants';
import LeftMeuItem from './leftMenuItem.vue';

const { isShowLeftMenu } = MenuService();
</script>

<template>
  <q-drawer v-model="isShowLeftMenu" show-if-above bordered class="bg-brand flex column">
    <q-list>
      <LeftMeuItem title="menu.calculation" :icon="ionCalculatorOutline" route-name="Home" />

      <LeftMeuItem title="menu.instruction" :icon="ionStatsChartOutline" route-name="Instruction" />
    </q-list>

    <q-space />

    <q-separator />

    <LeftMeuItem title="menu.suggestion" :icon="ionBugOutline" route-name="Suggestion" />

    <LeftMeuItem title="menu.faq" :icon="ionHelpCircleOutline" route-name="FAQ" />

    <LeftMeuItem title="menu.aboutUs" :icon="ionInformationCircleOutline" route-name="About" />

    <div class="text-capitalize text-center q-pa-sm text-weight-light text-caption">
      {{ `${$t('version')}: ${APP_VERSION}` }}
    </div>
  </q-drawer>
</template>

<style scoped></style>
