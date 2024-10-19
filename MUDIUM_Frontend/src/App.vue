<template>
  <div class="root-container">
    <Navigation @open-login-modal="openLoginModal" @open-signup-modal="openSignupModal" />
    <LoginModal :isLoginModalVisible="isLoginModalVisible" @close="closeLoginModal"
      @switch-to-signup="switchToSignupModal" />
    <SignupModal :isSignupModalVisible="isSignupModalVisible" @close="closeSignupModal"
      @switch-to-login="switchToLoginModal" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from './stores/userStore';
import Navigation from '@/components/layout/Navigation.vue';
import LoginModal from '@/views/user/components/LoginModal.vue';
import SignupModal from '@/views/user/components/SignupModal.vue';

const isLoginModalVisible = ref(false);
const isSignupModalVisible = ref(false);
const userStore = useUserStore();

const openLoginModal = () => {
  isLoginModalVisible.value = true;
};

const closeLoginModal = () => {
  isLoginModalVisible.value = false;
};

const openSignupModal = () => {
  isSignupModalVisible.value = true;
};

const closeSignupModal = () => {
  isSignupModalVisible.value = false;
};

const switchToLoginModal = () => {
  closeSignupModal();
  openLoginModal();
};

const switchToSignupModal = () => {
  closeLoginModal();
  openSignupModal();
};
</script>

<style>
/* Add any global styles here */
</style>