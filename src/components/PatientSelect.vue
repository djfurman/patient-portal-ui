<script setup>
// import { usePatientsIdStore } from '@/stores/patientsId'
import { useUserStore } from '@/stores/user'
// import { storeToRefs } from 'pinia'

const user = useUserStore()
// const patients = usePatientsIdStore()


</script>

<template>
  <div class="navbar-item has-dropdown" v-if="user.isLoggedIn && user.accesses.isPopulated">
    <div class="navbar-dropdown">
      <a class="navbar-link"></a>
    </div>
  </div>
</template>