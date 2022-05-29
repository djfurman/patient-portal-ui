<script setup>
import { ref } from "vue";
import { useSimpleUserStore } from "@/stores/simpleUser";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";

library.add(faUserDoctor);

const userStore = useSimpleUserStore();

const subject = ref("");
const messageBody = ref("");
const whoAmI = userStore.userId;

const contactList = ref([
  { id: "abcd-1234", fullName: "DogMan; M.D." },
  { id: "efgh-4567", fullName: "Picachu; PsyD" },
  { id: "ijkl-7890", fullName: "Revvit; Ph.D." },
  { id: "mnop-9876", fullName: "Olaf; LSW" },
  { id: "qrsw-5432", fullName: "Motamoai, Moana; PT" },
  { id: "xyza-1098", fullName: "Maui; Cardiologist" },
]);
const recipient = ref("");

const sendMessage = () => {
  const payload = {
    subject: subject.value,
    body: body.value,
    at: new Date(),
    from: whoAmI.value,
    to: recipient.value,
  };

  console.log(payload);
};
</script>

<template>
  <div id="secure-message-create">
    <h1 class="title">New Message</h1>

    <form @submit.prevent="sendMessage">
      <div class="field">
        <p class="control has-icons-left">
          <i class="fa-solid fa-user-doctor"></i>
          <span class="select">
            <select v-model="recipient">
              <option
                v-for="{ id, fullName } in contactList"
                :value="id"
                :key="id"
              >
                {{ fullName }}
              </option>
            </select>
          </span>
        </p>
      </div>

      <div class="field">
        <label class="label">Subject</label>
        <input
          v-model="subject"
          type="text"
          class="input"
          placeholder="Message Subject"
        />
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Message</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <textarea
                v-model="messageBody"
                class="textarea"
                placeholder="Detailed Message"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="control">
        <button class="button is-primary">Submit</button>
      </div>
    </form>
  </div>
</template>
