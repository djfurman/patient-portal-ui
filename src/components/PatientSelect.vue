<script setup>
import { usePatientsIdStore } from '@/stores/patientsId'
import { useSimpleUserStore } from '@/stores/simpleUser'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const userStore = useSimpleUserStore()
const { isLoggedIn, isAccessPopulated } = storeToRefs(userStore)
const patientsIdStore = usePatientsIdStore()
const { patients, selectedPatient } = storeToRefs(patientsIdStore)
const { getPatientByPatientId } = patientsIdStore

const accessUpdate = userStore.$onAction(({
  name,
  store,
  args,
  after,
  onError,
}) => {
  if (name === 'refreshAccesses') {
    after(() => {
      console.log('subscriber realized accesses had been refreshed')
      patientsIdStore.fill()
    })

    onError((error) => {
      console.warn('something bad happened trying to subscribe to the store')
      console.log(error)
    })
  }
})

const buildPatientName = (patientBasicId) => {
  const basicId = patientBasicId.value
  if (basicId == undefined) {
    return null
  }

  if (!basicId.name.preferred_username.value) {
    return `${basicId.name.given_name.value} ${basicId.name.family_name.value}`
  }

  return basicId.preferred_username.value
}

const currentPatient = computed(() => {
  return getPatientByPatientId(selectedPatient)
})

const currentPatientName = computed(buildPatientName((currentPatient)))

const patientName = computed((patient) => {
  return buildPatientName(patient)
})

const menuIsActive = ref(false)
const dynamicClass = computed((menuIsActive) => {
  if (menuIsActive) { return 'is-active' }
})

const selectPatient = (patientId) => {
  patientsIdStore.state.selectPatient = patientId
  menuIsActive.value = !menuIsActive.value
}
</script>

<template>
  <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn && isAccessPopulated">
    <a class="navbar-link" :class="dynamicClass" @click="menuIsActive = !menuIsActive">Acting As: {{ currentPatientName
    }} </a>

    <div class="navbar-dropdown">
      <div class="navbar-item" v-for="patient in patients" :key="patient.id" @click="selectPatient(patient.id)">{{
          patientName
      }}</div>
    </div>
  </div>
</template>