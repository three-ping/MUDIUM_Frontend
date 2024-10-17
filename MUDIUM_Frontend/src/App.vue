<template>
  <!-- <Navigation /> -->
  <AppHeader />
  <!-- <main class="container-fluid"> -->
    <main>
    <RouterView :key="$route.fullPath" />
    </main>
    <!-- <MyPage /> -->
  <!-- </main> -->
  <Footer />
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import Navigation from './components/layout/Navigation.vue';
import MyPage from './views/user/MyPage.vue';
import Footer from './components/layout/Footer.vue';
</script>

<style>
/* * {
    font-family: 'Noto Sans KR';
  text-decoration: none;
} */
</style>