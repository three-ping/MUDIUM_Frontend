<template>
  <Navigation />
  <!-- <AppHeader /> -->
  <main class="container-fluid">
    <!-- <RouterView /> -->
    <MyPage />
  </main>
  <Footer />
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
import Navigation from './components/Navigation.vue';
import MyPage from './views/user/MyPage.vue';
import Footer from './components/Footer.vue';
</script>

<style>
/* * {
  font-family: 'Noto Sans KR';
} */
</style>