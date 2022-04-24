<script setup>
import { ref } from 'vue';
import MessageCompose from '@/components/MessageCompose.vue'
import MessageDetail from '@/components/MessageDetail.vue'
import MessageList from '@/components/MessageList.vue'
import { useMessageStore } from '@/stores/messages'

const messageStore = useMessageStore()
messageStore.fill()

const messageMode = ref('list')
const setMessageMode = (mode) => {
  messageMode.value = mode
}

const conversationId = ref('')
const setSelectedConversation = (c) => {
  conversationId.value = c
  setMessageMode('detail')
}
</script>

<template>
  <div id="secure-messages" class="box">
    <h1 class="title">Secure Messages</h1>

    <div class="field">
      <div class="control">
        <button v-if="messageMode === 'list'" @click="setMessageMode('compose')" class="button is-primary">Send
          Message</button>
        <button v-else-if="messageMode === 'compose'" @click="setMessageMode('list')" class="button is-secondary">Back
          to
          Messages</button>
        <button v-else-if="messageMode === 'detail'" @click="setMessageMode('list')" class="button is-secondary">Back
          to
          Messages</button>
      </div>
    </div>

    <div class="field">
      <div id="message-list" v-if="messageMode === 'list'">
        <MessageList @select-conversation="setSelectedConversation" />
      </div>

      <div id="message-detail" v-else-if="messageMode === 'detail'">
        <MessageDetail :current-message-id="conversationId" />
      </div>

      <div id="message-compose" v-else-if="messageMode === 'compose'">
        <MessageCompose />
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>