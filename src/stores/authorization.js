import { defineStore } from 'pinia'
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
    }
  }),
  actions: {
    fetchRecordAuthorizations() {
      // Hard code a user for testing
      const user = { loggedIn: true, loadingState: false, errorLoadingState: false, userId: 'anonymous' }
      // This will be the common user store
      // const user = useUserStore()
      if (user.loggedIn) {
        this.access = this.fetchAuthsForUser(user.userId)
      } else {
        throw new Error('User is not authenticated')
      }
    },
    async fetchAuthsForUser(userId) {
      return await api.get(`/users/${userId}/authorizations`)
        .then((authorizations) => {
          if (authorizations.status === 'success') {
            this.access = authorizations.data
          } else {
            console.log(authorizations)
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  }
})