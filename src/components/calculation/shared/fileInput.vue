<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ionCloseOutline } from '@quasar/extras/ionicons-v7';

const props = defineProps<{ isLoading: boolean }>();
const emit = defineEmits<{
  (e: 'onSubmit', file: File): void;
}>();

const { t } = useI18n({ useScope: 'global' });

const file = ref<File>();

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
</script>

<template>
  <q-card-section>
    <q-form @submit="emit('onSubmit', file!)">
      <q-file
        filled
        clearable
        no-error-icon
        name="file"
        :clear-icon="ionCloseOutline"
        v-model="file"
        :rules="[required]"
        :label="$t('calculation.fileLabel')" />

      <q-btn
        :label="$t('calculation.submit')"
        type="submit"
        color="primary"
        class="q-mt-md"
        :disable="props.isLoading"
        :loading="props.isLoading" />
    </q-form>
  </q-card-section>
</template>

<style scoped></style>
