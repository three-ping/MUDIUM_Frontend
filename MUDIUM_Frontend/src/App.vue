<template>
  <div class="root-container">
    <Navigation @open-login-modal="openLoginModal" @open-signup-modal="openSignupModal" />
    <LoginModal :isLoginModalVisible="isLoginModalVisible" @close="closeLoginModal"
      @update:isLoggedIn="handleLoginSuccess" @update:userInfo="updateUserInfo" />
    <router-view />
    <Modal />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from './stores/userStore';
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

const handleLoginSuccess = (isLoggedIn) => {
  if (isLoggedIn) {
    userStore.updateLoginStatus(true);
    closeLoginModal();
  }
};

const updateUserInfo = (userInfo) => {
  userStore.updateUserInfo(userInfo);
};
</script>

<style>
/* Add any global styles here */
</style>