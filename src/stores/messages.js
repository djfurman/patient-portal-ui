import { defineStore } from 'pinia'
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
    async fetchUserMessages() {
      const auths = useAuthorizationStore()
      if (auths.access.patients) {
        // code to handle patient(s) experience
        const patientId = auths.access.patients[0]
        try {
          this.messages = await api.get(`/patients/${patientId}/messages`)
            .then((messageRes) => {
              if (messageRes.status === 'success') {
                this.messages = messageRes.data.messages
              } else {
                console.log(messageRes)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } catch (error) {
          console.log('error happened while awaiting')
          console.log(error)
        }
      } else if (auths.access.providers) {
        // code to handle provider experience
        console.log('Provider logic fired in messages store')
      } else {
        console.log('An error occurred in establishing the authorizations store')
        console.log(auths)
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
