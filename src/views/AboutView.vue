<template>
  <section class="section">
    <h1 class="title">MyHealthCo</h1>
    <p class="content">A fake testing company</p>

    <article class="article block">
      <h2 class="subtitle">Who we are</h2>
      <p class="content">MyHealthCo is not a real company. So why do we have a webpage?</p>
      <p class="content">
        Well, as it turns out it's far more effective to solve problems people can relate to, instead of using
        abstracts.
        Health care is not only a nearly global human experience, it involves many key business processes common to many
        industries.
      </p>
    </article>

    <article class="article block">
      <h1 class="subtitle">What will this do?</h1>
      <div class="content is-normal">
        <ul>
          <li v-for="useCase in useCases" :key="useCase.id" :class="{ 'checkmark-li': useCase.isActive }">
            <span>{{ useCase.description }}</span>
          </li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const useCases = ref([
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
    isActive: true,
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
])

</script>

<style scoped>
.checkmark-li::marker {
  content: "✓";
  color: white;
}

li span {
  position: relative;
  left: 1rem;
}
</style>