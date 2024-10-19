// src/stores/userStore.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {
      isLoggedIn: false,
      // Add other user properties as needed
    },
  }),
  actions: {
    updateUserInfo(newInfo) {
      this.userInfo = { ...this.userInfo, ...newInfo };
    },
    clearUserInfo() {
      this.userInfo = {
        isLoggedIn: false,
        // Reset other user properties as needed
      };
    },
    updateLoginStatus(isLoggedIn) {
      this.userInfo.isLoggedIn = isLoggedIn;
    },
  },
});
