<script setup lang="ts">
import type { CalculateResponse } from '@types';
import type { QTableProps } from 'quasar';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ionCaretDownOutline, ionCaretUpOutline } from '@quasar/extras/ionicons-v7';

const model = defineModel<CalculateResponse['table']>({ required: false });

const $q = useQuasar();
const { t } = useI18n({ useScope: 'global' });

const expanded = ref(false);
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
</script>

<template>
  <q-card-actions v-if="model">
    <q-space />

    <q-btn round flat dense :icon="expanded ? ionCaretUpOutline : ionCaretDownOutline" @click="expanded = !expanded" />
  </q-card-actions>

  <q-slide-transition v-if="model">
    <div v-show="expanded">
      <q-separator />

      <q-card-section class="row">
        <q-table
          :grid="$q.screen.lt.sm"
          :title="$t('calculation.table.name')"
          :rows="model"
          :columns="columns"
          row-key="date" />
      </q-card-section>
    </div>
  </q-slide-transition>
</template>

<style scoped></style>
