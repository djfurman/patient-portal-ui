<script setup>
import { useMessageStore } from '../stores/messages'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import router from '../router';

const messagesStore = useMessageStore()
const {messages, total, unread} = storeToRefs(messagesStore)

const showDetail = ref(false)

// const toggleDetail = () => {
//   if (!showDetail.value) {
//     showDetail.value = true
//   } else {
//     showDetail.value = false
//   }
// }

const composeMessage = () => {
  router.push({name: 'compose'})
}
</script>

<template>
  <div id="secure-message-index">
    <h1 class="title">Secure Messages</h1>
    <button 
      @click="composeMessage"
      class="btn btn-primary"
    >Send Message</button>
    <h2 class="subtitle">You have {{ unread }} new messages</h2>
      <li 
        v-for="message in messages"
        :key="message.conversationId"
      >
        <span>{{ message.at.toLocaleString() }} | {{ message.from }} | {{ message.subject }}</span>
      </li>

      <p>You have {{ total }} total messages</p>
  </div>
</template>
