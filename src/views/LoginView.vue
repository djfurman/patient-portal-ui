<script setup>
import { useAuthorizationStore } from "@/stores/authorization"
import { onMounted } from "vue"
import router from '@/router'

onMounted(() => {
  const auths = useAuthorizationStore()
  auths.fetchRecordAuthorizations()
})

const login = (() => {
  router.push({ name: 'home' })
})
</script>

<template>
  <div class="controls">
    <h1 class="title">Login</h1>
    <button class="button is-primary" @click="login">Login</button>
  </div>
</template>