<template>
  <Navigation />

  <main class=container>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
import Navigation from './components/Navigation.vue';

</script>

<style>
/* * {
  font-family: 'Noto Sans KR';
} */
</style>