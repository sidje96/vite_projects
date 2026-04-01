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

    inspectionsByStatus: (state) => (status) => {
      const list = state.submittedInspections.filter(i => i.Status === status)

      return [...list].sort((a, b) => {
        const dateA = new Date(a.Date)
        const dateB = new Date(b.Date)

        return state.sortAsc
          ? dateB - dateA
          : dateA - dateB
      })
    },

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
        if (!res.ok) throw new Error(`Server error: ${res.status}`)

        const data = await res.json()

        await new Promise(resolve => setTimeout(resolve, 500))

        this.submittedInspections = data.map(item => createInspection(item))

      } catch (err) {
        this.error = 'server'
        this.errorMsg = 'De server reageert niet'
      } finally {
        this.loadingInitial = false
      }
    },

    async addInspection(data, isSync = false) {
      this.loadingAction = true
      this.error = null

      try {
        if (!data.Id) {
          data.Id = Math.random().toString(36).slice(2, 6)
        }

        if (!isSync && !navigator.onLine) {
          this.pendingSync.push({ type: 'add', data })
          this.submittedInspections.push(data)
          return
        }

        const payload = {
          ...data,
          id: data.Id
        }
        delete payload.Id

        const res = await fetch(`${BASE_URL}/inspections`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })

        await new Promise(resolve => setTimeout(resolve, 250))

        const saved = await res.json()

        const normalized = createInspection(saved)

        const index = this.submittedInspections.findIndex(i => i.Id === normalized.Id)
        if (index !== -1) {
          this.submittedInspections[index] = normalized
        } else {
          this.submittedInspections.push(normalized)
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

    async deleteInspection(Id, isSync = false) {
      this.loadingAction = true

      try {
        if (!isSync && !navigator.onLine) {
          this.pendingSync.push({ type: 'delete', Id })

          this.submittedInspections = this.submittedInspections.filter(
            insp => insp.Id !== Id
          )

          if (this.currentInspection?.Id === Id) {
            this.currentInspection = null
          }

          return
        }

        await fetch(`${BASE_URL}/inspections/${Id}`, { method: "DELETE" })

        this.submittedInspections = this.submittedInspections.filter(
          insp => insp.Id !== Id
        )

        if (this.currentInspection?.Id === Id) {
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

          const index = this.submittedInspections.findIndex(i => i.Id === updated.Id)
          if (index !== -1) {
            this.submittedInspections[index] = updated
          }
          return
        }

        const payload = {
          ...updated,
          id: updated.Id
        }
        delete payload.Id

        const res = await fetch(`${BASE_URL}/inspections/${updated.Id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })

        const saved = await res.json()

        const normalized = createInspection(saved)

        const index = this.submittedInspections.findIndex(i => i.Id === normalized.Id)
        if (index !== -1) {
          this.submittedInspections[index] = normalized
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

    removePendingSync(Id) {
      this.pendingSync = this.pendingSync.filter(i => i.Id !== Id)
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
          await this.deleteInspection(item.Id, true)
        }
      }
    },

    setFormInspection(data) {
      this.formInspection = data
    },

    clearFormInspection() {
      this.formInspection = JSON.parse(JSON.stringify(defaultInspection))
    },

    toggleSort() {
      this.sortAsc = !this.sortAsc
    }
  }
})