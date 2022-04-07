import { defineStore } from 'pinia'

// conversationId is keyed around the concept of patientId:providerId:sequenceNumber
// This exchange convention is used by EDIFACT and ASC to identify messages in EDI
// Since this can be stored in NoSQL with a list of patient notes for the user
// And if a fetch of all patients for a provider is available reused there
// The goal is to feed this with a WSS API and channels for all actors

// In the final implementation this will use cognito IDs instead of UUIDs 

export const useMessageStore = defineStore({
  id: 'messages',
  state: () => ({
    messages: [
      {
        conversationId: '0144e876-7985-47fe-becb-acb78d24261b:acc2431b-da4d-46b3-9a49-fc3445c909cc:2',
        subject: 'Secure Message',
        from: 'Dr. Green',
        at: new Date("2022-03-21T17:13:51"),
        body: 'Lab results are in everything looks great, let me know if there any issues, otherwise I will see you at your next appointment.',
        isRead: false,
      },
      {
        conversationId: '0144e876-7985-47fe-becb-acb78d24261b:acc2431b-da4d-46b3-9a49-fc3445c909cc:1',
        subject: 'Test results?',
        from: 'John Cleese',
        at: new Date("2020-03-10T09:32:13"),
        body: 'I know these test can take a while but please let me know when you get the results',
        isRead: true,
      },
    ]
  }),
  getters: {
    total: (state) => state.messages.length,
    unread: (state) => state.messages.filter(message => !message.isRead).length,
    getMessageByConversationId: (state) => {
      return (conversationId) => state.messages.find((message) => message.conversationId === conversationId)
    },
  },
  actions: {
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
