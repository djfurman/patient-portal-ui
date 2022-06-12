<script setup>
import { ref } from 'vue'

const postalCode = ref("")
const streetAddressLine1 = ref("")
const streetAddressLine2 = ref("")
const city = ref("")
const state = ref("")

const hasNoStreetAddressLine2 = ref(false)
</script>

<template>
  <section class="section">
    <h2 class="subtitle">
      <slot></slot> Address
    </h2>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label for="streetAddressLine1" class="label">Street Address Line 1</label>
          <div class="control">
            <input aria-required="true" class="input address-line" name="streetAddressLine1" required="required"
              type="text" v-model="streetAddressLine1">
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label for="noLine2" class="label">No Address Line 2</label>
          <div class="control">
            <input aria-required="false" type="checkbox" name="noLine2" required="false"
              v-model="hasNoStreetAddressLine2">
          </div>
        </div>
        <div class="field" v-if="!hasNoStreetAddressLine2">
          <label for="streetAddressLine2" class="label">Street Address Line 2</label>
          <div class="control">
            <input aria-required="false" type="text" class="input" name="streetAddressLine2" required="false"
              v-model="streetAddressLine2">
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label for="city" class="label">City</label>
          <div class="control">
            <input disabled="true" type="text" class="input" name="city" v-model="city">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label for="state" class="label">State</label>
          <div class="control">
            <input disabled="true" type="text" class="input" name="state" v-model="state">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label for="postalCode" class="label">Postal Code</label>
          <div class="control">
            <input type="text" class="input" name="postalCode" v-model="postalCode">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>