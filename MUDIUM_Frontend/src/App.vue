<template>
  <div id="app">
    <Navigation @open-login-modal="openLoginModal" :isLoggedIn="isLoggedIn" />
    <LoginModal :isLoginModalVisible="isLoginModalVisible" @close="closeLoginModal"
      @update:isLoggedIn="updateLoginStatus" @update:userInfo="emitUserInfo" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navigation from '@/components/layout/Navigation.vue';
import LoginModal from '@/views/user/components/LoginModal.vue';

const isLoginModalVisible = ref(false);
let isLoggedIn = ref(false);
const openLoginModal = () => {
  isLoginModalVisible.value = true;
};

const closeLoginModal = () => {
  isLoginModalVisible.value = false;
};

const updateLoginStatus = (status) => {
  isLoggedIn.value = true;
  // Handle login status update
};


</script>

<style>
/* Add any global styles here */
</style>