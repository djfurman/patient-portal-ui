<script setup>
import { useMessageStore } from '@/stores/messages'

const messagesStore = useMessageStore()
</script>

<template>
  <section class="section">
    <h2 class="subtitle">You have {{ messagesStore.unread }} new messages</h2>
    <ul id="current-messages">
      <li v-for="message in messagesStore.messages" :key="message.conversationId">
        <span @click="$emit('selectConversation', message.conversationId)">{{ message.at.toLocaleString() }} | {{
            message.from
        }} | {{ message.subject }}</span>
      </li>
    </ul>
    <p>You have {{ messagesStore.total }} total messages</p>
  </section>
</template>