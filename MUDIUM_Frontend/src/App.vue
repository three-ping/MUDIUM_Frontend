<template>
  <Navigation />
  <!-- <AppHeader /> -->
  <main class="container-fluid">
    <!-- <main> -->
    <RouterView :key="$route.fullPath" />
  </main>
  <!-- <MyPage /> -->
  <!-- </main> -->
  <Footer />
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
* {
  font-family: 'Noto Sans KR';
  text-decoration: none;
}
</style>
