
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCustomers() {
      try {
        this.loading = true
        const authStore = useAuthStore()
        const response = await axios.get(`inventory/customers/list/${authStore.getEntityId}`, {
          headers: { Authorization: `${authStore.token}` }
        })
        this.customers = response.data.customer
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch customers'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createCustomer(customerData) {
      try {
        this.loading = true
        const authStore = useAuthStore()
        const response = await axios.post('inventory/customers/add/', customerData, {
          headers: { Authorization: `${authStore.token}` }
        })
        this.fetchCustomers()
        return response
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create customer'
        throw error
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    getAllCustomers: (state) => state.customers
  }
})