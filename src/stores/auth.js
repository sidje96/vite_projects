import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    step: 1,
    generatedCode: null,
    error: null
  }),

  actions: {
    login(username, password) {
      if (username === 'sidney' && password === 'test123') {
        this.generatedCode = String(Math.floor(Math.random() * 900000) + 100000)

        this.step = 2
        this.error = null
      } else {
        this.error = 'Onjuiste login'
      }
    },

    verifyCode(code) {
      if (code === this.generatedCode) {
        this.isAuthenticated = true
        this.user = { name: 'Sidney' }
        this.step = 3
        this.error = null
      } else {
        this.error = 'Verkeerde code'
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      this.step = 1
      this.generatedCode = null
    }
  }
})
