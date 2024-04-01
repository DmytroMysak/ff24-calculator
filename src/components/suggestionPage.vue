<script setup lang="ts">
import { ref } from 'vue';
import { ionMailOutline, ionCloudDoneOutline } from '@quasar/extras/ionicons-v7';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { SuggestionService } from '@services/suggestion.service';
import { ValidationService } from '@services/validation.service';

const { t } = useI18n({ useScope: 'global' });
const $q = useQuasar();
const { sendEmail } = SuggestionService();
const { required, email } = ValidationService();

const form = ref();
const emailValue = ref<string>();
const textValue = ref<string>();
const isLoading = ref(false);

async function onSubmit() {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;

  const validation = await form.value.validate();
  if (!validation) {
    isLoading.value = false;
    return;
  }

  sendEmail(emailValue.value!, textValue.value!)
    .then(() =>
      $q.notify({
        color: 'green-4',
        position: 'top',
        textColor: 'white',
        icon: ionCloudDoneOutline,
        message: t('suggestion.submitted'),
      }),
    )
    .catch((error) => $q.dialog({ title: t('suggestion.errorHeader'), message: t((error as any).message) }))
    .finally(() => {
      isLoading.value = false;
      form.value.reset();
      form.value.resetValidation();
      emailValue.value = undefined;
      textValue.value = undefined;
    });
}
</script>

<template>
  <q-page class="q-pa-md q-col-gutter-x-md q-col-gutter-y-md">
    <q-card v-ripple class="q-mb-lg">
      <q-card-section class="text-h4">
        {{ $t('suggestion.title') }}
      </q-card-section>

      <q-card-section class="text-subtitle2">
        {{ $t('suggestion.description') }}
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-form class="q-gutter-md" ref="form" @submit.prevent="onSubmit">
          <q-input
            v-model="emailValue"
            type="email"
            :label="$t('suggestion.email')"
            clearable
            filled
            :rules="[email, required]">
            <template #prepend>
              <q-icon :name="ionMailOutline" />
            </template>
          </q-input>

          <q-input v-model="textValue" filled type="textarea" :label="$t('suggestion.text')" :rules="[required]" />

          <q-btn
            :label="$t('suggestion.submit')"
            type="submit"
            color="primary"
            :disable="isLoading"
            :loading="isLoading" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
