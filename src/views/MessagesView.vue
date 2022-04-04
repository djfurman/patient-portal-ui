<template>
    <div>
        <h1>You have {{unread}} new messages</h1>
        <li v-for="message in messages">
            <span @click="">{{message.at.toLocaleTimeString()}}  {{message.from}}  {{message.subject}}</span>
        </li>
        <p>You have {{total}} total messages</p>
    </div>
</template>

<script setup>
import { useMessageStore } from '../stores/messages'
import { storeToRefs } from 'pinia'

const messagesStore = useMessageStore()

const {messages, total, unread} = storeToRefs(messagesStore)

</script>