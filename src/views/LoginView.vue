<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useSimpleUserStore } from '@/stores/simpleUser'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faLock, faUser)
const router = useRouter()

const username = ref('')
const password = ref('')

const user = useSimpleUserStore()

const login = async () => {
  await user.login(username.value)
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <form class="form" @submit.prevent="login">
    <h1 class="title">Login</h1>

    <div class="field">
      <label for="username" class="label">Username</label>
      <div class="control has-icons-left">
        <input id="username" v-model="username" type="text" class="input" placeholder="Your username or email address">
        <span class="icon is-small is-left">
          <i class="fa-solid fa-user"></i>
        </span>
      </div>

    </div>
    <div class="field">
      <label for="password" class="label">Password</label>
      <div class="control has-icons-left">
        <span class="icon is-small is-left">
          <i class="fa-solid fa-lock"></i>
        </span>
        <input id="password" name="password" v-model="password" type="password" class="input">
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" type="submit">Login</button>
      </div>

      <div class="control">
        <button class="button is-link is-light" type="button" @click="router.back()">Cancel</button>
      </div>
    </div>
  </form>
</template>