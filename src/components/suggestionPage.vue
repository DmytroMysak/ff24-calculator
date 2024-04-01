<script setup lang="ts">
import { Translation } from 'vue-i18n';

const stepCount = 9;
</script>

<template>
  <q-page class="q-pa-md q-col-gutter-x-md q-col-gutter-y-md">
    <q-card v-ripple class="q-mb-lg">
      <q-card-section class="text-h4">
        {{ $t('faq.title') }}
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-list separator>
          <q-expansion-item
            expand-separator
            switch-toggle-side
            :label="$t(`faq.question${number}`)"
            v-for="number in stepCount"
            :key="number">
            <q-card>
              <q-card-section>
                <Translation :keypath="`faq.answer${number}`" tag="span" scope="global">
                  <template #url>
                    <a :href="$t(`faq.url${number}`)">{{ $t(`faq.urlText${number}`) }}</a>
                  </template>
                </Translation>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>
