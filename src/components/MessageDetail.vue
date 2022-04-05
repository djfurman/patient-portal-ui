<script setup>
import { useMessageStore } from '../stores/messages'
import { storeToRefs } from 'pinia'
import { toRef } from 'vue'

const props = defineProps({
    conversationId: String,
    required: true,
})

const currentMessageId = toRef(props, 'conversationId')

const messagesStore = useMessageStore()
const {messages} = storeToRefs(messagesStore)

const msg = messages.filter((message) => currentMessageId == message.conversationId)[0]
</script>

<template>
    <article>
        <div class="message-header">
            <p>{{ msg.subject }}</p>
            <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
            <h1>From: {{ msg.from }}</h1>
            <i id="sent-at">{{ msg.at }}</i>
            <p>{{ msg.body }}</p>
        </div>
    </article>
</template>