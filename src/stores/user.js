import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    initials: 'S',
    prefersColor: null,
    prefersDark: false,
  }),

  persist: true,

  actions: {
    setInitials(value) {
        this.initials = value
    },

    setDark(value) {
        this.prefersDark = value
    },

    setColor(value) {
        this.prefersColor = value
    },

    getShadowTint(opacity = 40) {
        if (!this.prefersColor) return 'hsl(177, 100%, 40%)'

        const parts = this.prefersColor.match(/\d+/g)
        if (!parts) return 'hsl(177, 100%, 40%)'

        const [h, s] = parts
        return `hsl(${h}, ${s}%, ${opacity}%)`
        }
  }
})
