<template>
  <Navigation />
  <main class="container-fluid">
    <!-- <RouterView /> -->
    <MyPage />
  </main>
  <!-- <Footer /> -->
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';

import Navigation from './components/layout/Navigation.vue';
import MyPage from './views/user/MyPage.vue';
import Footer from './components/layout/Footer.vue';
</script>

<style>
/* * {
  font-family: 'Noto Sans KR';
} */
</style>