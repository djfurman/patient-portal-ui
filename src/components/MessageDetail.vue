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

<script>
import { useMessageStore } from '../stores/messages'
import { storeToRefs } from 'pinia'

export default {
    setup(props) {
        const messagesStore = useMessageStore()

        const {messages} = storeToRefs(messagesStore)

        const msg = messages.filter(message => props.conversation_id == message.conversation_id)[0]
    }
}
</script>