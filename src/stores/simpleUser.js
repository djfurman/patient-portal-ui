import { defineStore } from 'pinia'

export const useSimpleUserStore = defineStore({
  id: 'simpleUser',
  state: () => ({
    cognitoInfo: {},
    loggedIn: false,
    loadingState: false,
    errorLoadingState: false
  }),
  actions: {
    login() {
      this.loggedIn = true
    },

    logout() {
      this.$reset()
      // this.$state.loggedIn = false
    },
  }
})