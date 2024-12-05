import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
  }),
  actions: {
    setAuthData(token) {
      this.token = token;
    },
    clearAuthData() {
      this.token = null;
    },
  },
});
