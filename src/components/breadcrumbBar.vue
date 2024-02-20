<script setup lang="ts">
import { onMounted } from 'vue';
import { BreadcrumbService } from '@services/breadcrumb.service';
import { ionChevronForward } from '@quasar/extras/ionicons-v7';

const { items, onMountedBreadcrumbs } = BreadcrumbService();

onMounted(onMountedBreadcrumbs);
</script>

<template>
  <div class="q-pa-md q-gutter-xs">
    <q-breadcrumbs gutter="xs">
      <q-breadcrumbs-el
        class="text-capitalize"
        v-for="(item, index) in items"
        :key="index"
        :label="item.title"
        :to="item.to"
        :disable="item.disabled" />

      <template #separator>
        <q-icon size="1.5em" :name="ionChevronForward" />
      </template>
    </q-breadcrumbs>
  </div>
</template>

<style scoped></style>
