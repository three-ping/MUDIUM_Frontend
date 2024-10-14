<template>
  <button class="primary">버튼</button>
  <button class="secondary"></button>
  <button class="contrast"></button>
  <AppHeader />
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
</script>

<style>
* {
  font-family: 'Noto Sans KR';
}
</style>