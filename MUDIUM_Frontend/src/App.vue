<template>
  <div class="root-container">
    <Navigation @open-login-modal="openLoginModal" @open-signup-modal="openSignupModal" :userInfo="userStore.userInfo"
      @userInfo="userStore.updateUserInfo" @logout="userStore.clearUserInfo" />
    <LoginModal :isLoginModalVisible="isLoginModalVisible" @close="closeLoginModal"
      @update:isLoggedIn="userStore.updateLoginStatus" @update:userInfo="userStore.updateUserInfo" />
    <router-view />
    <Modal />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from './scripts/user/user';
import Navigation from '@/components/layout/Navigation.vue';
import LoginModal from '@/views/user/components/LoginModal.vue';
import Modal from './components/layout/Modal.vue';
const isLoginModalVisible = ref(false);
const userStore = useUserStore();

const openLoginModal = () => {
  isLoginModalVisible.value = true;
};

const closeLoginModal = () => {
  isLoginModalVisible.value = false;
};

const openSignupModal = () => {
  // Implement signup modal logic here
  console.log('Open signup modal');
};
</script>

<style>
/* Add any global styles here */
</style>