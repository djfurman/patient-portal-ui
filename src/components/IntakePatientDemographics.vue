<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faVenusMars } from "@fortawesome/free-solid-svg-icons";

library.add(faVenusMars);

const birthDate = ref("");
const race = ref([]);
const sex = ref("");

// Was hoping this was standardized, sadly the best source available was the US Census Bureau
// I'll update this if any standard can be identified with better specificity to race
// Reference: https://www.census.gov/topics/population/race/about.html

const raceList = [
  {
    label: "white",
    description:
      "A person having origins in any of the original peoples of Europe, the Middle East, or North Africa.",
  },
  {
    label: "black or african american",
    description:
      "A person having origins in any of the Black racial groups of Africa.",
  },
  {
    label: "american indian or alaska native",
    description:
      "A person having origins in any of the original peoples of North and South America (including Central America) and who maintains tribal affiliation or community attachment.",
  },
  {
    label: "asian",
    description:
      "A person having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian subcontinent including, for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam.",
  },
  {
    label: "native hawaiian or other pacific islander",
    description:
      "A person having origins in any of the original peoples of Hawaii, Guam, Samoa, or other Pacific Islands.",
  },
];
</script>

<template>
  <section class="section" id="demographics">
    <h2 class="subtitle">Demographics</h2>

    <div class="columns">
      <div class="column">
        <div class="control has-icons-left">
          <label for="sex" class="label">Sex</label>
          <div class="select">
            <select name="sex" id="sex" v-model="sex" aria-required="true">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <span class="icon is-left">
              <i class="fa-solid fa-venus-mars"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="control">
          <label for="race" class="label">Race Background(s)</label>
          <div class="select is-multiple">
            <select
              name="race"
              id="race"
              v-model="race"
              aria-required="true"
              multiple
            >
              <!-- TODO do something to show the description here -->
              <option v-for="{ label } in raceList" :value="label" :id="label">
                {{ label }}
              </option>
            </select>
            <!-- TODO need a way to identify if Mac or PC OS -->
            <p class="help">Hold Control to Select Multiple Options</p>
            <p class="help">Hold Command to Select Multiple Options</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
