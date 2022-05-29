<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHospitalUser } from "@fortawesome/free-solid-svg-icons";

library.add(faHospitalUser);

const practice = ref("MyHealthCo General Practice");
const familyName = ref("");
const givenName = ref("");
const middleName = ref("");
const hasNoMiddleName = ref(false);
const nickname = ref("");
</script>

<template>
  <section class="section" id="identification">
    <h1 class="title">{{ practice }}</h1>
    <h2 class="subtitle">Intake Form</h2>

    <div class="columns">
      <div class="has-icons-left">
        <span class="icon is-small is-left">
          <i class="fa-solid fa-hospital-user"></i>
        </span>
        <h3>Name</h3>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label for="familyName" class="label">Family Name</label>
          <div class="control">
            <input
              aria-required="true"
              class="input"
              id="familyName"
              name="familyName"
              required="required"
              type="text"
              v-model="familyName"
            />
          </div>
          <p class="help">Last Name</p>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label for="givenName" class="label">Given Name</label>
          <div class="control">
            <input
              aria-required="true"
              class="input"
              id="givenName"
              name="givenName"
              required="required"
              type="text"
              v-model="givenName"
            />
          </div>
          <p class="help">First Name</p>
        </div>
      </div>
      <div class="column">
        <div class="field is-grouped">
          <div class="field">
            <label for="middleName" class="label">Middle Name</label>
            <div class="control">
              <input
                aria-required="false"
                class="input"
                id="middleName"
                name="middleName"
                type="text"
                v-model="middleName"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label for="noMiddleName" class="checkbox">
                No Middle Name
              </label>
              <input
                aria-required="false"
                id="noMiddleName"
                name="noMiddleName"
                type="checkbox"
                v-model="hasNoMiddleName"
              />
            </div>
          </div>
          <p class="help">Middle Name</p>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label for="nickname" class="label">Nickname</label>
          <div class="control">
            <input
              aria-required="false"
              class="input"
              id="nickname"
              name="nickname"
              type="text"
              v-model="nickname"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
