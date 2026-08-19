import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: localStorage.getItem('gp_theme') || 'light'
  }),
  actions: {
    toggle() {
      this.mode = this.mode === 'light' ? 'dark' : 'light'
      this.apply()
    },
    apply() {
      const root = document.documentElement
      if (this.mode === 'dark') root.classList.add('dark')
      else root.classList.remove('dark')
      localStorage.setItem('gp_theme', this.mode)
    }
  }
})
