<script setup lang="ts">
import { CalculationService } from '@services/calculation.service';
import type { CalculateResponse } from '@types';
import { QTableProps, useQuasar } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiClose, mdiChevronUp, mdiChevronDown } from '@quasar/extras/mdi-v5';

const $q = useQuasar();
const { t } = useI18n({ useScope: 'global' });
const { calculate } = CalculationService();

const file = ref<File>();
const isLoading = ref(false);
const expanded = ref(false);
const data = ref<CalculateResponse>();
const columns: QTableProps['columns'] = [
  {
    name: 'date',
    required: true,
    label: t('calculation.table.date'),
    align: 'left',
    sortable: true,
    field: 'date',
  },
  {
    name: 'exchangeRate',
    required: true,
    label: t('calculation.table.exchangeRate'),
    align: 'left',
    sortable: true,
    field: 'exchangeRate',
  },
  {
    name: 'profitInUsd',
    required: true,
    label: t('calculation.table.profitInUsd'),
    align: 'left',
    sortable: true,
    field: 'profitInUsd',
  },
  {
    name: 'profitInUah',
    required: true,
    label: t('calculation.table.profitInUah'),
    align: 'left',
    sortable: true,
    field: 'profitInUah',
  },
];

function required(value: File): boolean | string {
  if (!value) {
    return t('validation.required');
  }
  if (value?.type !== 'application/json') {
    return t('validation.invalidFormat');
  }
  if (value?.size <= 0) {
    return t('validation.fileEmpty');
  }
  return true;
}

async function onSubmit(evt: any) {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;
  try {
    data.value = await calculate(file.value);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    $q.dialog({ title: t('calculation.error'), message: t((error as any).message) });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <q-page class="q-pa-lg large-button-padding">
    <q-card>
      <q-card-section>
        <div class="text-h4 q-pa-sm">{{ $t('calculation.header') }}</div>

        <div class="text-subtitle1 q-pl-sm">{{ $t('calculation.subtitle') }}</div>
        <div class="text-subtitle1 q-pl-sm">{{ $t('calculation.subtitle2') }}</div>
        <div class="text-subtitle1 q-pl-sm">{{ $t('calculation.subtitle3') }}</div>
        <div class="text-subtitle1 q-pl-sm">{{ $t('calculation.subtitle4') }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-file
            filled
            clearable
            no-error-icon
            lazy-rules
            name="file"
            :clear-icon="mdiClose"
            v-model="file"
            :rules="[required]"
            :label="$t('calculation.fileLabel')" />

          <q-btn
            :label="$t('calculation.submit')"
            type="submit"
            color="primary"
            :disable="isLoading"
            :loading="isLoading" />
        </q-form>
      </q-card-section>

      <q-card-section class="row" v-if="data">
        <div class="col col-8 col-xs-8 col-sm-4 col-md-3 col-lg-2 col-xl-2">
          {{ $t('calculation.total', { currency: 'UAH' }) }}
        </div>

        <div class="col col-4 col-xs-4 col-sm-2 col-md-2 col-lg-1 col-xl-1">
          {{ data.totalInUah }} {{ $t('calculation.uah') }}
        </div>
      </q-card-section>

      <q-card-section class="row" v-if="data">
        <div class="col col-8 col-xs-8 col-sm-4 col-md-3 col-lg-2 col-xl-2">
          {{ $t('calculation.total', { currency: 'USD' }) }}
        </div>

        <div class="col col-4 col-xs-4 col-sm-2 col-md-2 col-lg-1 col-xl-1">
          {{ data.totalInUsd }} {{ $t('calculation.usd') }}
        </div>
      </q-card-section>

      <q-card-section class="row" v-if="data">
        <div class="col col-8 col-xs-8 col-sm-4 col-md-3 col-lg-2 col-xl-2">
          {{ $t('calculation.gainTax') }}
        </div>

        <div class="col col-4 col-xs-4 col-sm-2 col-md-2 col-lg-1 col-xl-1">
          {{ data.gainTax }} {{ $t('calculation.uah') }}
        </div>
      </q-card-section>

      <q-card-section class="row" v-if="data">
        <div class="col col-8 col-xs-8 col-sm-4 col-md-3 col-lg-2 col-xl-2">
          {{ $t('calculation.militaryTax') }}
        </div>

        <div class="col col-4 col-xs-4 col-sm-2 col-md-2 col-lg-1 col-xl-1">
          {{ data.militaryTax }} {{ $t('calculation.uah') }}
        </div>
      </q-card-section>

      <q-card-actions v-if="data">
        <q-space />

        <q-btn round flat dense :icon="expanded ? mdiChevronUp : mdiChevronDown" @click="expanded = !expanded" />
      </q-card-actions>

      <q-slide-transition v-if="data">
        <div v-show="expanded">
          <q-separator />

          <q-card-section class="row">
            <q-table
              :grid="$q.screen.lt.sm"
              :title="$t('calculation.table.name')"
              :rows="data?.table"
              :columns="columns"
              row-key="date" />
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </q-page>
</template>

<style scoped>
.large-button-padding {
  padding-bottom: 200px;
}
</style>
