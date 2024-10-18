import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: { isLoggedIn: false },
  }),
  actions: {
    updateUserInfo(info) {
      this.userInfo = { ...this.userInfo, ...info };
    },
    updateLoginStatus(status) {
      this.userInfo.isLoggedIn = status;
    },
    clearUserInfo() {
      this.userInfo = { isLoggedIn: false };
    },
  },
});
