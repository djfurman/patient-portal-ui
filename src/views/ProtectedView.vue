<script setup>
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="content">
    <h1 class="title">Dashboard</h1>
    <RouterLink :to="{ name: 'messages' }">Secure Messages</RouterLink>
    <button @click="router.push({ name: 'intake' })" class="button is-primary">
      Intake Forms
    </button>
  </div>
</template>
