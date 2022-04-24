<script setup>
import { useMessageStore } from '@/stores/messages'

const props = defineProps(['currentMessageId'])

console.log(props.currentMessageId)
const messageStore = useMessageStore()
const msg = messageStore.getMessageByConversationId(props.currentMessageId)
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png"
              alt="Placeholder white image for senders profile" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ msg.from }}</p>
          <p class="subtitle is-6">{{ msg.subject }}</p>
        </div>
      </div>

      <div class="content">
        {{ msg.body }}
        <br><br>
        <span class="is-italic">{{ msg.at }}</span>
      </div>
    </div>
  </div>
</template>