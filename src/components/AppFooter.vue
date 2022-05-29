<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouseMedical } from "@fortawesome/free-solid-svg-icons";
import { computed } from "vue";

library.add(faHouseMedical);

const buildYear = 2022;

const copyrightYears = computed(() => {
  const currentYear = new Date().getUTCFullYear();
  if (buildYear === currentYear) {
    return buildYear;
  }
  return `${buildYear} - ${currentYear}`;
});
</script>

<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p class="has-icons-left">
        <i class="fa-solid fa-house-medical"></i>
        <strong>MyHealthCo</strong> is an example health care provider, built by
        <a href="https://github.com/MyHealthCo">Daniel Furman</a>. The source
        code is licensed under the
        <a href="https://opensource.org/licenses/BSD-3-Clause">BSD-3-Clause</a>.
        All code is presented for demonstration purposes only using a real world
        example. It is not associated with any actual health care organization and any
        resemblance to any entity real or fictitious is purely coincidental.
      </p>
      <p>
        Copyright <a href="https://github.com/djfurman">Daniel Furman</a>
        {{ copyrightYears }}.
      </p>
    </div>
  </footer>
</template>
