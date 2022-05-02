import { defineStore, acceptHMRUpdate } from 'pinia'
import { CognitoAuth } from 'amazon-cognito-auth-js'
import { useRouter } from 'vue-router'

const router = useRouter()
const CLIENT_ID = ""
const APP_DOMAIN = ""
const REDIRECT_URI = ""
const USERPOOL_ID = ""
const REDIRECT_URI_SIGNOUT = ""
const APP_URL = ""

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    cognitoInfo: {},
    loggedIn: false,
    loadingState: true,
    errorLoadingState: false
  }),
  actions: {
    authenticate() {
      const authData = {
        ClientId: CLIENT_ID,
        AppWebDomain: APP_DOMAIN,
        TokenScopesArray: ['openid', 'email', 'userId'],
        RedirectUriSignIn: REDIRECT_URI,
        RedirectUriSignOut: REDIRECT_URI_SIGNOUT,
        UserPoolId: USERPOOL_ID,
      }

      let cognitoAuth = new CognitoAuth(authData)

      cognitoAuth.userhandler = {
        onSuccess: (result) => {
          console.log("On Success result", result)
          // TODO make this do whatever else is needed
          this.$state.cognitoInfo = result
          this.login(true)
          router.push({ name: 'messages' })
        },
        onFailure: (err) => {
          console.log("On Error result", err)
          this.logout()
          this.$state.loadingState = false
          this.$state.errorLoadingState = true
        }
      }
    },

    login(newValue) {
      this.$state.loggedIn = newValue
    },

    logout() {
      this.$reset()
      this.$state.loggedIn = false
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}