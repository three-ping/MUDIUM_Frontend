<template>
  <div id="app">
    <Navigation @open-login-modal="openLoginModal" :userInfo="userStore.userInfo" @userInfo="userStore.updateUserInfo"
      @logout="userStore.clearUserInfo" />
    <LoginModal :isLoginModalVisible="isLoginModalVisible" @close="closeLoginModal"
      @update:isLoggedIn="userStore.updateLoginStatus" @update:userInfo="userStore.updateUserInfo" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from './scripts/user/user';
import Navigation from '@/components/layout/Navigation.vue';
import LoginModal from '@/views/user/components/LoginModal.vue';

const isLoginModalVisible = ref(false);
const userStore = useUserStore();

const openLoginModal = () => {
  console.log("openLoginModal")
  isLoginModalVisible.value = true;
};

const closeLoginModal = () => {
  console.log('closeLoginModal')
  isLoginModalVisible.value = false;
};

</script>

<style>
/* Add any global styles here */
</style>
