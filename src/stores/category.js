
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from "@/stores/auth"


export const useCategoryStore = defineStore('category', {
  state: () => ({
    loading: false,
    error: null
  }),

  actions: {

    async createCategory(categoryData) {
      try {
        this.loading = true
        const authStore = useAuthStore()
        const response = await axios.post('inventory/category/add/', categoryData, {
          headers: { Authorization: `${authStore.token}` }
        })
        return response
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create category'
        throw error
      } finally {
        this.loading = false
      }
    }
  },

})
