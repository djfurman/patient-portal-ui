import { acceptHMRUpdate, defineStore } from 'pinia'
// import { useUserStore } from '/user'
import { useSimpleUserStore } from '@/stores/simpleUser'
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
    isLoading: true,
  }),
  actions: {
    async fill() {
      // Use the common user store
      const user = useSimpleUserStore()
      // handle the API call part of the function
      try {
        let authRes = await api.get(`/users/${user.userId}/authorizations`, { responseAs: 'response' })

        if (authRes.status === 200 || authRes.status === 304) {
          const authData = await authRes.json()
          if (authData.status === 'success') {
            this.access = authData.data
            this.isLoading = false
          } else {
            console.log(authData)
          }
        } else {
          console.log(authRes)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async refreshAuthorizations() {
      await this.fill()
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthorizationStore, import.meta.hot))
}