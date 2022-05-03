<script setup>
import { usePatientsIdStore } from '@/stores/patientsId'
import { useSimpleUserStore } from '@/stores/simpleUser'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const userStore = useSimpleUserStore()
const { isLoggedIn, isAccessPopulated } = storeToRefs(userStore)
const patientsIdStore = usePatientsIdStore()

const menuIsActive = ref(false)
const dynamicClass = computed((menuIsActive) => {
  if (menuIsActive) { return 'is-active' }
})

const selectPatient = (patientId) => {
  patientsIdStore.setActivePatient(patientId)
  menuIsActive.value = !menuIsActive.value
}
</script>

<template>
  <div class="navbar-item has-dropdown is-hoverable"
    v-if="isLoggedIn && isAccessPopulated && patientsIdStore.isPopulated">
    <a class="navbar-link" :class="dynamicClass" @click="menuIsActive = !menuIsActive">Acting As: {{
        patientsIdStore.currentPatient.name
    }} </a>

    <div class="navbar-dropdown">
      <div class="navbar-item" v-for="patient in patientsIdStore.patients" :key="patient.id">
        <a @click="selectPatient(patient.id)">{{ patient.name }}</a>
      </div>
    </div>
  </div>
</template>