<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="content">
    <h1 class="title">Dashboard</h1>
    <RouterLink :to="{ name: 'messages' }">Secure Messages</RouterLink>
  </div>

</template>

