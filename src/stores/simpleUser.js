import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSimpleUserStore = defineStore({
  id: 'simpleUser',
  state: () => ({
    cognitoInfo: {},
    loggedIn: false,
    loadingState: false,
    errorLoadingState: false,
    userId: '',
  }),
  getters: {
    isLoggedIn: (state) => { return state.loggedIn }
  },
  actions: {
    login(username) {
      // This is where the auth call would be made and hopefully encode the application userId
      this.userId = username
      this.loggedIn = true
    },

    logout() {
      this.$reset()
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSimpleUserStore, import.meta.hot))
}