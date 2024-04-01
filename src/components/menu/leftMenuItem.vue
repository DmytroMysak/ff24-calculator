<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { format } from 'quasar';

const props = defineProps<{ title: string; icon: string; routeName: string }>();

const { capitalize } = format;
const router = useRouter();
const route = useRoute();

function goTo(name: string) {
  router.push({ name });
}
</script>

<template>
  <q-item clickable :active="route.name === props.routeName" @click="goTo(props.routeName)">
    <q-item-section avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section class="text-h6"> {{ capitalize($t(props.title)) }} </q-item-section>
  </q-item>

  <q-separator />
</template>

<style scoped></style>
