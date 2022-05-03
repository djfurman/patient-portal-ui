<script setup>
import { RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/messages'
import { usePatientsIdStore } from '@/stores/patientsId';
import { useSimpleUserStore } from '@/stores/simpleUser';
import TitleBar from '@/components/TitleBar.vue'

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
