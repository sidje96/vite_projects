import { defineStore } from 'pinia'
import { createInspection } from '@/models/Inspections.js'
import { API_URL } from '@/config'
import { defaultInspection } from '@/models/defaultInspection'

const BASE_URL = API_URL

export const useInspectionStore = defineStore('inspection', {
  state: () => ({
    submittedInspections: [],
    currentInspection: null,
    formInspection: JSON.parse(JSON.stringify(defaultInspection)),
    loadingInitial: false,
    loadingAction: false,
    sortAsc: true,
    error: null,
    errorMsg: null,
    pendingSync: []
  }),

  persist: {
    paths: [
      'submittedInspections',
      'pendingSync',
      'formInspection'
    ]
  },

  getters: {
    numberCompleted(state) {
      return state.submittedInspections.filter(i => i.Status === "Completed").length
    },
    numberScheduled(state) {
      return state.submittedInspections.filter(i => i.Status === "Scheduled").length
    },

    inspectionsByStatus: (state) => (status) =>
      state.submittedInspections.filter(i => i.Status === status),

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
      this.error = null
      this.errorMsg = null

      try {
        if (!navigator.onLine) {
          this.error = 'offline'
          this.errorMsg = 'Geen internetverbinding'
          return
        }

        const res = await fetch(`${BASE_URL}/inspections`)

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }

        const data = await res.json()

        await new Promise(resolve => setTimeout(resolve, 500))

        this.submittedInspections = data.map(item => createInspection(item))

      } catch (err) {
        this.error = 'server'
        this.errorMsg = 'De server reageert niet'
        console.error(err)

      } finally {
        this.loadingInitial = false
      }
    },

    async addInspection(data, isSync = false) {
      this.loadingAction = true
      this.error = null

      try {
        if (!data.id) {
          data.id = Math.random().toString(36).slice(2, 6)
        }

        if (!isSync && !navigator.onLine) {
          this.pendingSync.push({ type: 'add', data })
          this.submittedInspections.push(data)
          return
        }

        const res = await fetch(`${BASE_URL}/inspections`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })

        await new Promise(resolve => setTimeout(resolve, 250))

        const saved = await res.json()
        const index = this.submittedInspections.findIndex(i => i.id === data.id)

        if (index !== -1) {
          this.submittedInspections[index] = saved
        } else {
          this.submittedInspections.push(saved)
        }


      } catch (err) {
        this.error = err
      } finally {
        this.loadingAction = false
      }
    },

    async fetchInspectionsByStatus(status) {
      this.loadingInitial = true
      this.error = null
      this.errorMsg = null

      try {
        if (!navigator.onLine) {
          this.error = 'offline'
          this.errorMsg = 'Geen internetverbinding'
          return
        }

        const res = await fetch(`${BASE_URL}/inspections?Status=${status}`)
        if (!res.ok) throw new Error(`Server error: ${res.status}`)

        const data = await res.json()

        await new Promise(resolve => setTimeout(resolve, 250))

        this.submittedInspections = data.map(item => createInspection(item))

      } catch (err) {
        this.error = 'server'
        this.errorMsg = 'De server reageert niet'
      } finally {
        this.loadingInitial = false
      }
    },

    async deleteInspection(id, isSync = false) {
      this.loadingAction = true

      try {
        if (!isSync && !navigator.onLine) {
          this.pendingSync.push({ type: 'delete', id })

          this.submittedInspections = this.submittedInspections.filter(
            insp => insp.id !== id
          )

          if (this.currentInspection?.id === id) {
            this.currentInspection = null
          }

          return
        }

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
    
    async updateInspection(updated, isSync = false) {
      this.loadingAction = true

      try {
        if (!isSync && !navigator.onLine) {
          this.pendingSync.push({ type: 'update', data: updated })

          const index = this.submittedInspections.findIndex( i => i.id === updated.id)
          if (index !== -1) {
            this.submittedInspections[index] = updated
          }
          return
        } 

        const res = await fetch(`${BASE_URL}/inspections/${updated.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated)
        })

        const saved = await res.json()

        const index = this.submittedInspections.findIndex(i => i.id === saved.id)
        if (index !== -1) {
          this.submittedInspections[index] = saved
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

    async flushPendingSync() {
      const queue = [...this.pendingSync]
      this.pendingSync = []

      for (const item of queue) {
        if (item.type === 'add') {
          await this.addInspection(item.data, true)
        }
        if (item.type === 'update') {
          await this.updateInspection(item.data, true)
        }
        if (item.type === 'delete') {
          await this.deleteInspection(item.id, true)
        }
      }
    },

    setFormInspection(data) {
      this.formInspection = data
    },

    clearFormInspection() {
      this.formInspection = this.formInspection = JSON.parse(JSON.stringify(defaultInspection))
    },

    toggleSort() {
      this.sortAsc = !this.sortAsc
    }
  }
})
