import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
export const userData = defineStore('user', {
  state: () => (
    {
      name: '',
      email: '',
      username: '',
      token: '',
      id: ''
    }),
  getters: {
    getUser: (state) => state.user
  },
  actions: {
    setUserToStore(payload) {
      this.name = payload.name
      this.email = payload.email
      this.username = payload.username
      this.id = payload.user_id
      this.token = payload.token
    }
  }
})
