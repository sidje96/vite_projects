import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    step: 1,
    generatedCode: null,
    error: null
  }),

  persist: true,

  actions: {
    async login(username, password) {
      this.error = null

      await new Promise(resolve => setTimeout(resolve, 300))

      if (username.trim().toLowerCase() === 'sidney' && password === 'test123') {
        this.generatedCode = String(Math.floor(Math.random() * 900000) + 100000)
        this.step = 2
        return true
      } else {
        this.error = 'Onjuiste login'
        return false
      }
    },

    async verifyCode(code) {
      this.error = null
      await new Promise(resolve => setTimeout(resolve, 200))

      if (code === this.generatedCode) {
        this.isAuthenticated = true
        this.user = { name: 'Sidney' }
        this.step = 3
        return true
      } else {
        this.error = 'Verkeerde code'
        return false
      }
    },
    
    generateNewCode() {
      this.generatedCode = String(Math.floor(Math.random() * 900000) + 100000)
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.step = 1
      this.generatedCode = null
    }
  }
})
