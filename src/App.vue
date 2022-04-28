<script setup>
import { RouterView } from 'vue-router'
import TitleBar from '@/components/TitleBar.vue'

// user.$onAction(({
//   name,
//   store,
//   args,
//   after,
//   onError,
// }) => {
//   if (name === 'logout') {
//     after(() => {

//     })
//   }
// })
</script>

<template>
  <div class="container">
    <header>
      <TitleBar />
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
@import "bulma/css/bulma.css";
@import "bulma-prefers-dark/css/bulma-prefers-dark.css";
</style>
