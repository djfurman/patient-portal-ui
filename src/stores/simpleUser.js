import { defineStore, acceptHMRUpdate } from 'pinia'
import { mande } from 'mande'

// Hard coding an authorization header for local dev
// This will come from the user store and AWS Cognito in prod
const api = mande('/demo')

export const useSimpleUserStore = defineStore({
  id: 'simpleUser',
  state: () => ({
    cognitoInfo: {},
    errorLoadingState: false,
    loggedIn: false,
    loadingState: false,
    token: {
      value: 'this is fine',
      type: 'Bearer',
      exp: 1651397266
    },
    userId: null,
    accesses: {
      patients: [],
      providers: [],
      isLoading: false,
      isPopulated: false,
      hasLoadErrors: false,
      selectedPatient: null,
    },
  }),
  getters: {
    actingOnBehalfOf: (state) => { return state.accesses.selectedPatient },
    getPatientIdList: (state) => {
      let patientIds = []
      state.accesses.patients.forEach((patient) => { patientIds.push(patient.patientId) })
      return patientIds
    },
    isLoggedIn: (state) => { return state.loggedIn },
  },
  actions: {
    async login(username) {
      this.loadingState = true
      try {
        // This is where the auth call would be made and hopefully encode the application userId
        const loginRes = await new Promise((res, rej) => {
          setTimeout(() => {
            res({ username })
          }, 300)
        })
        this.userId = loginRes.username
        this.isLoading = false
        this.loggedIn = true

        this.refreshAccesses()
      } catch (err) {
        this.errorLoadingState = true
        this.loadingState = false
        console.log(err)
      }
    },

    logout() {
      this.$reset()
    },

    async refreshAccesses() {
      try {
        // mark that accesses are being loaded
        this.accesses.isLoading = true
        // call the API to 
        let authRes = await api.get(`/users/${this.userId}/authorizations`, this.withApiSettings())

        if (authRes.status === 200 || authRes.status === 304) {
          const authData = await authRes.json()
          if (authData.status === 'success') {
            this.accesses.patients = authData.data.patients
            this.accesses.providers = authData.data.providers
            // mark that accesses have completed loading and the lists are populated
            this.accesses.isLoading = false
            this.accesses.isPopulated = true
          } else {
            this.setAccessErrors()
            console.log('jsend payload did not return success')
            console.log(authData)
          }
        } else {
          this.setAccessErrors()
          console.log('authorizations API call did not return success')
          console.log(authRes)
        }
      } catch (err) {
        this.setAccessErrors()
        console.log('the authorization data api call encountered an error')
        console.log(err)
      }
    },

    setAccessErrors() {
      this.accesses.hasLoadErrors = true
      this.accesses.isLoading = false
      this.accesses.isPopulated = false
    },

    withApiSettings() {
      return { responseAs: 'response', headers: { authorization: `${this.token.type} ${this.token.value}` } }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSimpleUserStore, import.meta.hot))
}