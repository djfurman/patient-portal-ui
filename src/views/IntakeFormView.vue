<script setup>
import AppAddress from "@/components/AppAddress.vue"
import IntakePatientIdentification from "@/components/IntakePatientIdentification.vue"
import IntakePatientDemographics from "@/components/IntakePatientDemographics.vue"
</script>

<template>
  <form class="form">
    <IntakePatientIdentification />
    <br />
    <IntakePatientDemographics />
    <br />
    <AppAddress>Patient</AppAddress>
    <AppAddress>Primary Insured</AppAddress>
  </form>
</template>
