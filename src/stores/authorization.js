import { defineStore } from 'pinia'
import { useUserStore } from '/user'

export const useAuthorizationStore = defineStore({
  id: 'authorizations',
  state: () => ({
    access: {
      patients: [],
      providers: [],
    }
  }),
  actions: {
    async fetchRecordAuthorizations() {
      const user = useUserStore()
      if (user.loggedIn) {
        this.access = await fetchAuthsForUser()
      } else {
        throw new Error('User is not authenticated')
      }
    }
  }

})