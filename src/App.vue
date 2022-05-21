<script setup>
import { dom } from '@fortawesome/fontawesome-svg-core'
import { RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/messages'
import { usePatientsIdStore } from '@/stores/patientsId'
import { useSimpleUserStore } from '@/stores/simpleUser'
import TitleBar from '@/components/TitleBar.vue'
import { onMounted } from 'vue'

dom.watch()

const userStore = useSimpleUserStore()
const patientsIdStore = usePatientsIdStore()
const messagesStore = useMessageStore()

const accessUpdate = userStore.$onAction(({
  name,
  store,
  args,
  after,
  onError,
}) => {
  if (name === 'refreshAccesses') {
    after(() => {
      console.log('subscriber realized accesses had been refreshed')
      patientsIdStore.fill()
    })

    onError((error) => {
      console.warn('something bad happened trying to subscribe to the store')
      console.log(error)
    })
  }

  if (name === 'logout') {
    after(() => {
      patientsIdStore.$reset()
      messagesStore.$reset()
    })

    onError((error) => {
      console.warn('something bad happened trying to reset the other stores')
      console.log(error)
    })
  }
})

onMounted(async () => {
  const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
  const socketUrl = `${socketProtocol}//${window.location.host}/ws`

  const socket = await new WebSocket(socketUrl)

  socket.onopen = () => {
    if (socket.readyState != socket.OPEN) {
      console.log('Could not send message')
    }
    socket.send(JSON.stringify({ message: "hello server" }))
  }

  socket.onmessage = (event) => {
    let parsedMessage = JSON.parse(event.data)
    console.log(parsedMessage)
  }
})
</script>

<template>
  <div class="container">
    <header>
      <TitleBar />
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
@import "bulma/css/bulma.css";
@import "bulma-prefers-dark/css/bulma-prefers-dark.css";
</style>
