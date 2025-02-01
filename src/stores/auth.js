import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    individual: JSON.parse(localStorage.getItem('individual')) || null,
    entity: JSON.parse(localStorage.getItem('entity')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),

  actions: {

    async signIn(credentials) {
      try {
        this.loading = true
        const response = await axios.post('individual/signin', credentials)
        this.token = response.data.token
        this.entity = response.data.entities[0]
        this.individual = response.data.individual
        localStorage.setItem('token', this.token)
        localStorage.setItem('entity', JSON.stringify(this.entity))
        localStorage.setItem('individual', JSON.stringify(this.individual))
        router.push({ name: 'dashboard' })
      } catch (error) {
        this.error = error.response?.data?.message || 'signin failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.individual = null
      this.token = null
      this.entity = null
      localStorage.removeItem('token')
      localStorage.removeItem('individual')
      localStorage.removeItem('entity')
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getError: (state) => state.error,
    getEntityId: (state) => state.entity?.entity.id,
  }
})
