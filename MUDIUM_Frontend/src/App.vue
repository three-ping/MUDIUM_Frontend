<template>
  <div id="app" class="root-container">
    <Navigation />
    <LoginModal :isLoginModalVisible="isLoginModalVisible" @close="closeLoginModal"
      @update:isLoggedIn="userStore.updateLoginStatus" @update:userInfo="userStore.updateUserInfo" />
    <router-view />
  </div>
  <Modal />
</template>

<script setup>
import { ref, onMounted, watchEffect, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from './scripts/user/user';
import Navigation from '@/components/layout/Navigation.vue';
import LoginModal from '@/views/user/components/LoginModal.vue';
const route = useRoute();
const isLoginModalVisible = ref(false);
const userStore = useUserStore();



const openLoginModal = () => {
  isLoginModalVisible.value = true;
};

const closeLoginModal = () => {
  isLoginModalVisible.value = false;
};

const handleLogout = () => {
  console.log('App - handleLogout')
  userStore.clearUserInfo();
}

watchEffect(() => {
  let userId = route.query.user_id;
  console.log(route.query);
  console.log(`userId: ${userId}`)
  // Check if userId and userName are present in the URL
  if (userId) {
    userStore.updateUserInfo({
      userId: userId,
      isLoggedIn: true
    });
  }
});
</script>

<style>
/* Add any global styles here */
</style>
