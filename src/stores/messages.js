import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuthorizationStore } from './authorization'
import { mande } from 'mande'

// conversationId is keyed around the concept of patientId:providerId:sequenceNumber
// This exchange convention is used by EDIFACT and ASC to identify messages in EDI
// Since this can be stored in NoSQL with a list of patient notes for the user
// And if a fetch of all patients for a provider is available reused there
// The goal is to feed this with a WSS API and channels for all actors

// In the final implementation this will use cognito IDs instead of UUIDs 

const api = mande('/demo', { headers: { authorization: 'this is fine' } })

export const useMessageStore = defineStore({
  id: 'messages',
  state: () => ({
    messages: [],
  }),
  getters: {
    total: (state) => state.messages.length,
    unread: (state) => state.messages.filter(message => !message.isRead).length,
    getMessageByConversationId: (state) => {
      return (conversationId) => state.messages.find((message) => message.conversationId === conversationId)
    },
  },
  actions: {
    async fill() {
      const authStore = useAuthorizationStore()
      if (authStore.access.patients) {
        // code to handle patient(s) experience
        const patientId = authStore.access.patients[0]
        try {
          let messageRes = await api.get(`/patients/${patientId}/messages`, { responseAs: 'response' })
          if (messageRes.status == 200 || messageRes.status === 304) {
            const messageData = await messageRes.json()
            if (messageData.status === 'success') {
              this.messages = messageData.data.messages
              this.isLoading = false
            } else {
              console.log('message respone data was other than status:success')
              console.log(messageData)
            }
          } else {
            console.log(`api call response was ${messageRes.status} other than 200 OK`)
            console.log(messageRes)
          }
        } catch (err) {
          console.log(err)
        }
      } else if (authStore.access.providers) {
        // code to handle provider experience
        console.log('Provider logic fired in messages store')
      } else {
        console.log('An error occurred in establishing the authorizations store')
        console.log(authStore)
      }
    },
    reply(conversationId, subject, from, body) {
      const conversationComponents = conversationId.split(':')
      const incrementReply = parseInt(conversationComponents[2]) + 1
      const newId = `${conversationComponents[0]}:${conversationComponents[1]}:${incrementReply.toString()}`
      // TODO replace this with a WSS call to push the event
      this.$state.messages.push({
        conversationId: newId,
        subject: subject,
        from: from,
        at: new Date(),
        body: body,
        isRead: true
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot))
}