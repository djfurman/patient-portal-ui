<script setup>
import { RouterLink } from 'vue-router'
import { useSimpleUserStore } from '@/stores/simpleUser'
import { useRouter } from 'vue-router'

const user = useSimpleUserStore()

const router = useRouter()
const fullLogout = () => {
  user.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a @click="router.push({ name: 'home' })" class="navbar-item">
        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder for MyHealthCo Logo" width="64"
          height="64">
      </a>

      <!-- Reactive Hamburger Menu -->
      <a class="navbar-burger" role="button" aria-label="menu" aria-expanded="false" data-target="navbarPatientPortal">
        <span aria-hidden="true">
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        </span>
        <span aria-hidden="true">
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </span>
        <span v-if="!user.isLoggedIn" aria-hidden="true">
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        </span>
        <span v-if="user.isLoggedIn" aria-hidden="true">
          <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
        </span>
        <span v-if="user.isLoggedIn" aria-hidden="true">
          <RouterLink :to="{ name: 'messages' }">Secure Messages</RouterLink>
        </span>
        <span v-if="user.isLoggedIn" aria-hidden="true">
          <a @click="fullLogout">Logout</a>
        </span>
      </a>
    </div>

    <!-- Full Screen Menu -->
    <div id="navbarPatientPortal" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        </div>
        <hr class="navbar-divider">

        <div class="navbar-item">
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </div>
        <hr class="navbar-divider">

        <div id="nav-dashboard" v-if="user.isLoggedIn">
          <div class="navbar-item">
            <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
          </div>
          <hr class="navbar-divider">
        </div>

        <div id="navbar-messages" v-if="user.isLoggedIn">
          <div class="navbar-item">
            <RouterLink :to="{ name: 'messages' }">Secure Messages</RouterLink>
          </div>
          <hr class="navbar-divider">
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <RouterLink :to="{ name: 'login' }" v-if="!user.isLoggedIn">Login</RouterLink>
          <a @click="fullLogout" v-if="user.isLoggedIn">Logout</a>
        </div>
      </div>
    </div>
  </nav>

</template>