<script setup>
import { useMessageStore } from '../stores/messages'
import { ref } from 'vue'

const props = defineProps(['currentMessageId'])

const messagesStore = useMessageStore()
const { getMessageByConversationId } = messagesStore
const msg = ref(getMessageByConversationId(props.currentMessageId))
</script>

<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img
                    src="https://bulma.io/images/placeholders/128x128.png"
                    alt="Placeholder white image for senders profile"
                />
            </p>
        </figure>
        <div class="media-content">
            <div class="media-right">
                <div class="content is-large">
                    <p>{{ msg.subject }}</p>
                </div>
                <div class="content is-small">
                    <h1>From: {{ msg.from }}</h1>
                    <i id="sent-at">{{ msg.at }}</i>
                    <p>{{ msg.body }}</p>
                </div>
            </div>
        </div>
    </article>
</template>