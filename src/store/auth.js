import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: JSON.parse(localStorage.getItem('gp_auth') || 'true')
  }),
  actions: {
    login() {
      this.isAuthenticated = true
      localStorage.setItem('gp_auth', 'true')
    },
    logout() {
      this.isAuthenticated = false
      localStorage.setItem('gp_auth', 'false')
    }
  }
})
