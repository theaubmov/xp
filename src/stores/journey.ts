import { defineStore } from 'pinia'

export const useJourneyStore = defineStore({
  id: 'journey',
  state: () => ({
    showDrawer: false
  })
})
