<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { MenuService } from '@services/menu.service';
import { Auth } from '@services/auth.service';

const router = useRouter();
const route = useRoute();
const { isShowLeftMenu } = MenuService();
const { isLoggedIn } = Auth();

const active = computed(() => {
  switch (route.name) {
    case 'ShoppingList':
    case 'CreateShoppingList':
      return 'shopping';
    case 'Recipes':
    case 'RecipeCreate':
    case 'RecipeDetail':
      return 'recipes';
    default:
      return '';
  }
});

function goTo(name: string) {
  router.push({ name });
}
</script>

<template>
  <q-drawer v-if="isLoggedIn" v-model="isShowLeftMenu" show-if-above bordered>
    <q-list>
      <q-item clickable :active="active === 'shopping'" @click="goTo('ShoppingList')">
        <q-item-section avatar>
          <q-icon color="primary" name="mdi-list-box-outline" />
        </q-item-section>

        <q-item-section class="text-capitalize"> {{ $t('shoppingList.name') }} </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable :active="active === 'recipes'" @click="goTo('Recipes')">
        <q-item-section avatar>
          <q-icon color="primary" name="mdi-receipt-text" />
        </q-item-section>

        <q-item-section class="text-capitalize"> {{ $t('recipe.name', 2) }} </q-item-section>
      </q-item>

      <q-separator />
    </q-list>
  </q-drawer>
</template>

<style scoped></style>
