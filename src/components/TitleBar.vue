<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useSimpleUserStore } from '@/stores/simpleUser'
import { useSocketConnectionStore } from '@/stores/socketConnection'
import PatientSelect from '@/components/PatientSelect.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCircleDot,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'

library.add(faCircleDot, faArrowCircleUp)

const user = useSimpleUserStore()
const socketConnection = useSocketConnectionStore()

const router = useRouter();
const fullLogout = () => {
  user.logout();
  router.push({ name: "home" });
};
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a @click="router.push({ name: 'home' })" class="navbar-item">
        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder for MyHealthCo Logo" width="64"
          height="64" />
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
        <hr class="navbar-divider" />

        <div class="navbar-item">
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </div>
        <hr class="navbar-divider" />

        <div id="nav-dashboard" class="navbar-item" v-if="user.isLoggedIn">
          <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
          <hr class="navbar-divider" />
        </div>

        <div id="navbar-messages" class="navbar-item" v-if="user.isLoggedIn">
          <RouterLink :to="{ name: 'messages' }">Secure Messages</RouterLink>
          <hr class="navbar-divider" />
        </div>
      </div>

      <div class="navbar-end">
        <div v-if="user.isLoggedIn">
          <div @click="socketConnection.connectSocket" class="navbar-item" v-if="!socketConnection.isSocketConnected">
            <i class="fa-solid fa-circle-dot"></i>
          </div>
          <div @click="socketConnection.closeSocket" class="navbar-item" v-if="socketConnection.isSocketConnected">
            <i class="fa-solid fa-arrow-circle-up"></i>
          </div>
        </div>

        <div class="navbar-item">
          <PatientSelect />
        </div>
        <div class="navbar-item">
          <RouterLink :to="{ name: 'login' }" v-if="!user.isLoggedIn">Login</RouterLink>
          <a @click="fullLogout" v-if="user.isLoggedIn">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>
