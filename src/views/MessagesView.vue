<script setup>
import router from '../router';
import MessageList from '@/components/MessageList.vue'

const composeMessage = () => {
  router.push({ name: 'compose' })
}
</script>

<template>
  <div id="secure-message-index">
    <h1 class="title">Secure Messages</h1>

    <button @click="composeMessage" class="button is-primary">Send Message</button>

    <MessageList />
  </div>
</template>