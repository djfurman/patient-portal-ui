import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSocketConnectionStore = defineStore({
  id: 'socketConnection',
  state: () => ({
    socketConnected: false,
    socket: null,
    countOfPongs: 0,
  }),
  getters: {
    isSocketConnected(state) {
      return state.socketConnected
    }
  },
  actions: {
    async connectSocket() {
      const socketProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
      const socketUrl = `${socketProtocol}//${window.location.host}/ws`;

      this.socket = await new WebSocket(socketUrl);

      this.socket.onopen = () => {
        if (this.socket.readyState != this.socket.OPEN) {
          console.error("Could not send message")
        } else {
          this.subscribeMessages()
          this.socketConnected = true
        }
        this.socket.send(JSON.stringify({ message: 'ping', source: 'pinia' }))
      }

      this.socket.onerror = (event) => {
        console.error(event)
        this.socketConnected = false
      }
    },
    subscribeMessages() {
      this.socket.onmessage = (event) => {
        let parsedMessage = JSON.parse(event.data)
        if (parsedMessage.status === 'success' && parsedMessage.data === 'pong') {
          this.countOfPongs++
        }
      }
    },
    closeSocket() {
      this.socket.close(1000, 'user closed socket')
      this.$reset()
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSocketConnectionStore, import.meta.hot))
}