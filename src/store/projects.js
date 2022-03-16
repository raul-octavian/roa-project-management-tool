import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: '',
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

export const useProjectStore = defineStore('simpleProjects', {
  state: () => ({
    name: '',
    id: '',
    description: '',
    due_date: '',
    available_hours: 0,
    percentUsed: '',
    percentAvailable: ''

  }),
  getters: {
    getSimpleProjects: (state) => state.simpleProjects
  },
  actions: {
    setSimpleProject(payload) {
      this.name = payload.name
      this.id = payload.id
      this.description = payload.description
      this.due_date = payload.due_date
      this.available_hours = payload.available_hours
      this.percentUsed = payload.percentUsed
      this.percentAvailable = payload.percentAvailable
    }
  }
})
