<template>
  <section class="section">
    <h1 class="title">MyHealthCo</h1>
    <h2 class="subtitle">Who we are</h2>
    <p class="content">
      MyHealthCo is not a real company. So why do we have a webpage? 
      Well, as it turns out it's far more effective to solve problems people can relate to, instead of using abstracts.
      Health care is not only a nearly global human experience, it involves many key business processes common to many industries.
    </p>

    <br/>

    <h2 class="subtitle">What will this do?</h2>
    <ul>
      <li 
        v-for="useCase in useCases.generalList" 
        :key="useCase.id"
      >
        {{ useCase.description }}
      </li>
    </ul>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const useCases = reactive({
  generalList: [
    {
      id: 1,
      description: 'Secure Messaging',
      isActive: true,
    },
    {
      id: 2,
      description: 'Appointment Scheduling',
      isActive: false,
    },
    {
      id: 3,
      description: 'Secure Document Submission',
      isActive: false,
    },
    {
      id: 4,
      description: 'Interactive Intake Forms',
      isActive: false,
    },
    {
      id: 5,
      description: 'Encounter notes',
      isActive: false,
    },
    {
      id: 6,
      description: 'Patient Invoicing',
      isActive: false,
    },
    {
      id: 7,
      description: 'Insurance Billing',
      isActive: false,
    },
    {
      id: 8,
      description: 'Provider Workspace',
      isActive: false,
    },
    {
      id: 9,
      description: 'Appointment Scheduling',
      isActive: false,
    },
    {
      id: 10,
      description: 'Secure Family Member Access Management',
      isActive: false,
    },
    {
      id: 11,
      description: 'User pool sign in',
      isActive: false,
    },
    {
      id: 12,
      description: 'Role based access controls allowing for role swaps',
      isActive: false,
    },
    {
      id: 13,
      description: 'Vitals monitoring',
      isActive: false,
    },
    {
      id: 14,
      description: 'Vitals integration with Apple Health',
      isActive: false,
    },
    {
      id: 15,
      description: 'Lab results',
      isActive: false,
    },
    {
      id: 16,
      description: 'Medication list',
      isActive: false,
    },
    {
      id: 17,
      description: 'Medication integration',
      isActive: false,
    },
    {
      id: 18,
      description: 'Medication reminders and journal',
      isActive: false,
    },
    {
      id: 19,
      description: 'Vaccine Records',
      isActive: false,
    },
    {
      id: 20,
      description: 'Accounting Integration',
      isActive: false,
    },
  ]
})

</script>