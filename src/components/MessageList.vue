<script setup>
import { useMessageStore } from '../stores/messages'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

onMounted(() => {
  const messagesStore = useMessageStore()
  messagesStore.fetchUserMessages()
})
const { messages, total, unread } = storeToRefs(messagesStore)
</script>

<template>
  <section class="section">
    <h2 class="subtitle">You have {{ unread }} new messages</h2>
    <ul id="current-messages">
      <li v-for="message in messages" :key="message.conversationId">
        <span @click="$emit('selectConversation', message.conversationId)">{{ message.at.toLocaleString() }} | {{
          message.from
        }} | {{ message.subject }}</span>
      </li>
    </ul>
    <p>You have {{ total }} total messages</p>
  </section>
</template>