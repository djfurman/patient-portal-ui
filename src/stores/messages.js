import { defineStore } from 'pinia'

export const useMessageStore = defineStore({
  id: 'messages',
  state: () => ({
    messages: [
        {
            subject: 'Secure Message',
            from: 'Dr. Green',
            at: new Date("2022-03-21T17:13:51"),
            body: 'Lab results are in everything looks great, let me know if there any issues, otherwise I will see you at your next appointment.',
            is_read: false,
        }
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
