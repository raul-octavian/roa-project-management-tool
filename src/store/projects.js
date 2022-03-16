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
    projects: []

  }),
  getters: {
    getSimpleProjects: (state) => state.simpleProjects
  },
  actions: {
    setSimpleProject(payload) {
      this.projects = []
      this.projects.push(payload)
    }
  }
})
