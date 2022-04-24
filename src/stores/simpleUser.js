import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSimpleUserStore = defineStore({
  id: 'simpleUser',
  state: () => ({
    cognitoInfo: {},
    loggedIn: false,
    loadingState: false,
    errorLoadingState: false
  }),
  getters: {
    isLoggedIn: (state) => { return state.loggedIn }
  },
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSimpleUserStore, import.meta.hot))
}