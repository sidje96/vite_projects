import { defineStore } from 'pinia'
import { createInspection } from '@/models/Inspections.js'
import { API_URL } from '@/config'

const BASE_URL = API_URL

export const useInspectionStore = defineStore('inspection', {
  state: () => ({
    submittedInspections: [],
    currentInspection: null,
    formInspection: null,
    loadingInitial: false,
    loadingAction: false,
    sortAsc: true,
    error: null,
    pendingSync: []
  }),

  persist: true,

  getters: {
    sortedInspections(state) {
      return [...state.submittedInspections].sort((a, b) => {
        const dateA = new Date(a.Date)
        const dateB = new Date(b.Date)

        return state.sortAsc
          ? dateB - dateA
          : dateA - dateB
      })
    }
  },

  actions: {
    async fetchInspections() {
      this.loadingInitial = true
      try {
        const res = await fetch(`${BASE_URL}/inspections`)
        const data = await res.json()

        await new Promise(resolve => setTimeout(resolve, 500))

        this.submittedInspections = data.map(item => createInspection(item))
      } catch (err) {
        this.error = err
      } finally { 
        this.loadingInitial = false
      }
    },

    async addInspection(data) {
      this.loadingAction = true
      try {
        const res = await fetch(`${BASE_URL}/inspections`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })

        await new Promise(resolve => setTimeout(resolve, 250))

        const saved = await res.json()
        this.submittedInspections.push(saved)
      } catch (err) {
        this.error = err
      } finally {
        this.loadingAction = false
      }
    },

    async deleteInspection(id) {
      this.loadingAction = true
      try {
        await fetch(`${BASE_URL}/inspections/${id}`, { method: "DELETE" })
        this.submittedInspections = this.submittedInspections.filter(
          insp => insp.id !== id
        )
        if (this.currentInspection?.id === id) {
          this.currentInspection = null
        }
      } finally {
        this.loadingAction = false
      }
    },
    
    async updateInspection(updated) {
      this.loadingAction = true
      try {
        const res = await fetch(`${BASE_URL}/inspections/${updated.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated)
        })

        const saved = await res.json()

        const index = this.submittedInspections.findIndex(i => i.id === saved.id)
        if (index !== -1) {
          this.submittedInspections[index] = updated
        }

        await this.fetchInspections()

        this.currentInspection = null

      } catch (err) {
        this.error = err
      } finally {
        this.loadingAction = false
      }
    },

    addPendingSync(inspection) {
      this.pendingSync.push(inspection)
    },

    removePendingSync(id) {
      this.pendingSync = this.pendingSync.filter(i => i.id !== id)
    },

    setFormInspection(data) {
      this.formInspection = data
    },

    clearFormInspection() {
      this.formInspection = null
    },

    toggleSort() {
      this.sortAsc = !this.sortAsc
    }
  }
})
