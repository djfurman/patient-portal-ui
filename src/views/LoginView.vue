<script setup>
import { useAuthorizationStore } from '@/stores/authorization'
import router from '@/router'
import { useSimpleUserStore } from '@/stores/simpleUser'

const user = useSimpleUserStore()

const auths = useAuthorizationStore()
auths.fetchRecordAuthorizations()

const login = () => {
  user.login()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="controls">
    <h1 class="title">Login</h1>
    <button class="button is-primary" @click="login">Login</button>
  </div>
</template>