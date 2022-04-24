import { acceptHMRUpdate, defineStore } from 'pinia'
// import { useUserStore } from '/user'
import { mande } from 'mande'

// Hard coding an authorization header for local dev
// This will come from the user store and AWS Cognito in prod
const api = mande('/demo', { headers: { authorization: 'this-is-fine' } })

export const useAuthorizationStore = defineStore({
  id: 'authorizations',
  state: () => ({
    access: {
      patients: [],
      providers: [],
    },
  }),
  actions: {
    async fetchRecordAuthorizations() {
      // Hard code a user for testing
      const user = { loggedIn: true, loadingState: false, errorLoadingState: false, userId: 'anonymous' }
      // This will be the common user store
      // const user = useUserStore()
      if (user.loggedIn) {
        try {
          let authRes = await api.get(`/users/${user.userId}/authorizations`, { responseAs: 'response' })

          if (authRes.status == 200) {
            const authData = await authRes.json()
            if (authData.status === 'success') {
              this.access = authData.data
            } else {
              console.log(authData)
            }
          } else {
            console.log(authRes)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthorizationStore, import.meta.hot))
}