import { defineStore } from 'pinia'
import { createInspection } from '@/models/Inspections.js'

const host = window.location.hostname
const BASE_URL = `http://${host}:3000`


export const useInspectionStore = defineStore('inspection', {
  state: () => ({
    submittedInspections: [],
    currentInspection: null,
    loadingInitial: false,
    loadingAction: false,
    error: null
  }),
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
    }
  }
})
