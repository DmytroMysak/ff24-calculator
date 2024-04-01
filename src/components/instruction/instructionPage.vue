<script setup lang="ts">
const stepCount = 8;
</script>

<template>
  <q-page class="q-pa-md q-col-gutter-x-md q-col-gutter-y-md">
    <q-card>
      <q-card-section class="text-h4 q-pa-sm"> {{ $t('instruction.header') }} </q-card-section>

      <q-card-section class="text-subtitle1"> {{ $t('instruction.subHeader') }} </q-card-section>

      <q-card-section>
        <q-list>
          <q-expansion-item
            expand-separator
            switch-toggle-side
            :label="$t(`instruction.step${number}`)"
            v-for="number in stepCount"
            :key="number">
            <q-card>
              <q-card-section>
                <q-img :src="`/instruction/step${number}.png`" style="max-width: 1024px; max-height: 1024px" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
