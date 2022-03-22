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

export const useActiveProjectStore = defineStore('activeProjects', {
  state: () => ({
    project: {}

  }),
  getters: {
    getActiveProject: (state) => state.project
  },
  actions: {
    setActiveProject(payload) {
      this.project = {}
      this.project = payload
    }
  }
})
