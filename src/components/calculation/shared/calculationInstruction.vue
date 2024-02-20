<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('mobile');
</script>

<template>
  <q-card>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator>
      <q-tab name="mobile" :label="$t('calculation.instruction.mobileTab')" />

      <q-tab name="desktop" :label="$t('calculation.instruction.desktopTab')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mobile">
        <div class="text-h6">{{ $t('calculation.instruction.mobile.header') }}</div>

        <q-list padding>
          <q-item v-ripple v-for="number in 9" :key="number">
            <q-item-section thumbnail> {{ number }} </q-item-section>
            <q-item-section> {{ $t(`calculation.instruction.mobile.step${number}`) }} </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>

      <q-tab-panel name="desktop">
        <div class="text-h6">{{ $t('calculation.instruction.desktop.header') }}</div>

        <q-list padding>
          <q-item v-ripple v-for="number in 10" :key="number">
            <q-item-section thumbnail> {{ number }} </q-item-section>

            <q-item-section>
              {{ $t(`calculation.instruction.desktop.step${number}`) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>

  <q-separator />
</template>

<style scoped></style>
