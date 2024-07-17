<script setup lang="ts">
import { CalculationService } from '@services/calculation.service';
import type { CalculateResponse } from '@types';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSessionStorage } from '@vueuse/core';
import { read } from 'xlsx';
import { ionRemoveOutline, ionHelpCircleOutline } from '@quasar/extras/ionicons-v7';
import { useRouter } from 'vue-router';
import CalculationTable from './shared/calculationTable.vue';
import FileInput from './shared/fileInput.vue';

const $q = useQuasar();
const router = useRouter();
const { t } = useI18n({ useScope: 'global' });
const { calculate } = CalculationService();

const isLoading = ref(false);
const data = useSessionStorage<CalculateResponse>('data', null, {
  serializer: { read: JSON.parse, write: JSON.stringify },
});

async function onSubmit(file: File) {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;

  const reader = new FileReader();
  reader.onerror = (err) => console.error(err); // eslint-disable-line no-console
  reader.onload = async (event: ProgressEvent<FileReader>) => {
    if (!event.target?.result) {
      throw new Error('validation.fileEmpty');
    }
    try {
      data.value = await calculate(read(event.target?.result, { type: 'binary' }));
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      $q.dialog({ title: t('calculation.error'), message: t((error as Error).message) });
    } finally {
      isLoading.value = false;
    }
  };
  reader.readAsBinaryString(file);
}
</script>

<template>
  <q-page class="q-pa-md q-col-gutter-x-md q-col-gutter-y-md">
    <q-card>
      <q-card-section>
        <div class="text-h4 q-pa-sm">{{ $t('calculation.header') }}</div>

        <q-btn
          :label="$t('menu.instruction')"
          :icon="ionHelpCircleOutline"
          class="q-mt-md"
          @click="router.push({ name: 'Instruction' })" />
      </q-card-section>

      <FileInput :is-loading="isLoading" @on-submit="onSubmit" />

      <template v-if="data">
        <q-card-section class="row">
          <div class="col col-8 col-xs-8 col-sm-4 col-md-3 col-lg-2 col-xl-2">
            {{ $t('calculation.period') }}
          </div>

          <div class="col col-4 col-xs-4 col-sm-8 col-md-9 col-lg-3 col-xl-3">
            {{ data.dateStart }}
            <q-icon :name="ionRemoveOutline" />
            {{ data.dateEnd }}
          </div>
        </q-card-section>

        <q-card-section class="row">
          <div class="col col-8 col-xs-8 col-sm-4 col-md-3 col-lg-2 col-xl-2">
            {{ $t('calculation.total', { currency: 'UAH' }) }}
          </div>

          <div class="col col-4 col-xs-4 col-sm-2 col-md-2 col-lg-1 col-xl-1">
            {{ data.totalInUah }} {{ $t('calculation.uah') }}
          </div>
        </q-card-section>

        <q-card-section class="row">
          <div class="col col-8 col-xs-8 col-sm-4 col-md-3 col-lg-2 col-xl-2">
            {{ $t('calculation.total', { currency: data.currency }) }}
          </div>

          <div class="col col-4 col-xs-4 col-sm-2 col-md-2 col-lg-1 col-xl-1">
            {{ data.totalInCurrency }} {{ data.currency.toLowerCase() }}
          </div>
        </q-card-section>

        <q-card-section class="row">
          <div class="col col-8 col-xs-8 col-sm-4 col-md-3 col-lg-2 col-xl-2">
            {{ $t('calculation.gainTax') }}
          </div>

          <div class="col col-4 col-xs-4 col-sm-2 col-md-2 col-lg-1 col-xl-1">
            {{ data.gainTax }} {{ $t('calculation.uah') }}
          </div>
        </q-card-section>

        <q-card-section class="row">
          <div class="col col-8 col-xs-8 col-sm-4 col-md-3 col-lg-2 col-xl-2">
            {{ $t('calculation.militaryTax') }}
          </div>

          <div class="col col-4 col-xs-4 col-sm-2 col-md-2 col-lg-1 col-xl-1">
            {{ data.militaryTax }} {{ $t('calculation.uah') }}
          </div>
        </q-card-section>

        <CalculationTable v-model="data.table" :currency="data.currency" />
      </template>
    </q-card>
  </q-page>
</template>

<style scoped>
.large-button-padding {
  padding-bottom: 200px;
}
</style>
