import { defineStore } from 'pinia'

export const useMessageStore = defineStore({
  id: 'messages',
  state: () => ({
    messages: [
        {
            conversation_id: '0144e876-7985-47fe-becb-acb78d24261b:acc2431b-da4d-46b3-9a49-fc3445c909cc:2',
            subject: 'Secure Message',
            from: 'Dr. Green',
            at: new Date("2022-03-21T17:13:51"),
            body: 'Lab results are in everything looks great, let me know if there any issues, otherwise I will see you at your next appointment.',
            is_read: false,
        },
        {
          conversation_id: '0144e876-7985-47fe-becb-acb78d24261b:acc2431b-da4d-46b3-9a49-fc3445c909cc:1',
          subject: 'Test results?',
          from: 'John Cleese',
          at: new Date("2020-03-10T09:32:13"),
          body: 'I know these test can take a while but please let me know when you get the results',
          is_read: true,
        },
    ]
  }),
  getters: {
    total: (state) => state.messages.length,
    unread: (state) => state.messages.filter(message => !message.is_read).length
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
