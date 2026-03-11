import { defineStore } from "pinia"

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [
      { id: 1, message: "Inspectie moet nog worden nagekeken" },
      { id: 2, message: "Nieuwe update beschikbaar" },
      { id: 3, message: "Inspectie nadert uiterste inspectie datum" }
    ]
  }),

  getters: {
    count(state) {
      return state.notifications.length
    }
  },

  actions: {
    clearAll() {
      this.notifications = []
    },
    
    remove(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    }
  }
})
