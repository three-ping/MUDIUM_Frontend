<template>
  <div id="app">
    <Navigation @open-login-modal="openLoginModal" :isLoggedIn="isLoggedIn" @userInfo="handleUserInfo" />
    <LoginModal :isLoginModalVisible="isLoginModalVisible" @close="closeLoginModal"
      @update:isLoggedIn="updateLoginStatus" @update:userInfo="handleUserInfo" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navigation from '@/components/layout/Navigation.vue';
import LoginModal from '@/views/user/components/LoginModal.vue';

const isLoginModalVisible = ref(false);
let isLoggedIn = ref(false);
const userInfo = ref(null); // Add a ref to store userInfo

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

const handleUserInfo = (info) => {
  userInfo.value = info;
  // Handle userInfo update
};

</script>

<style>
/* Add any global styles here */
</style>
