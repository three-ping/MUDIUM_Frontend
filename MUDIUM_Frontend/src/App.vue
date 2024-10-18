<template>
  <div id="app">
    <Navigation @open-login-modal="openLoginModal" :userInfo="userInfo" @userInfo="handleUserInfo"
      @logout="handleLogout" />
    <LoginModal :isLoginModalVisible="isLoginModalVisible" @close="closeLoginModal"
      @update:isLoggedIn="updateLoginStatus" @update:userInfo="handleUserInfo" />
    <main class="container-fluid">
      <!-- <main> -->
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navigation from '@/components/layout/Navigation.vue';
import LoginModal from '@/views/user/components/LoginModal.vue';

const isLoginModalVisible = ref(false);
const userInfo = ref({ isLoggedIn: false }); // Initialize userInfo with isLoggedIn

const openLoginModal = () => {
  isLoginModalVisible.value = true;
};

const closeLoginModal = () => {
  isLoginModalVisible.value = false;
};

const updateLoginStatus = (status) => {
  userInfo.value.isLoggedIn = status; // Update loginStatus inside userInfo
};

const handleUserInfo = (info) => {
  userInfo.value = { ...userInfo.value, ...info }; // Merge new info with existing userInfo
};

const handleLogout = () => {
  console.log('handleLogoutFunction')
  userInfo.value = { isLoggedIn: false, };
  console.log(userInfo.value)
}

</script>

<style>
/* Add any global styles here */
</style>
