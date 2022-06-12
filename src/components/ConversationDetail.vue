<script setup>
import { computed, ref } from 'vue'
import MessageDetail from '@/components/MessageDetail.vue';
import { useMessageStore } from '@/stores/messages';

const props = defineProps(['selectedConversationId'])

const messageStore = useMessageStore()
const conversation = messageStore.getMessagesByConversationId(props.selectedConversationId)
const messagesInConversation = computed(() => conversation.messages.length)
const visibleMessages = ref(5)
</script>

<template>
  <section class="section" id="conversation">
    <div class="content">
      <div class="columns">
        <h1 class="title" id="subject">{{ conversation.subject }}</h1>
        <div class="column">
          <h2 class="subtitle">{{ messagesInConversation }} messages in this conversation</h2>
        </div>

        <div class="column is-one-fifth">
          <div class="field">
            <div class="control">
              <div class="select">
                <label for="mesagesPerPage" class="label">Messages Per Page</label>
                <select name="messagesPerPage" id="mesagesPerPage" v-model="visibleMessages">
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="message" v-for="message in conversation.messages" :key="message.conversationId">
        <MessageDetail :currentMessageId="message.conversationId" />
      </div>
    </div>

  </section>
</template>