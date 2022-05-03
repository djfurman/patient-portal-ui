import { defineStore, acceptHMRUpdate } from 'pinia'
import { useSimpleUserStore } from '@/stores/simpleUser'
import { mande } from 'mande'

// Hard coding an authorization header for local dev
// This will come from the user store and AWS Cognito in prod
const api = mande('/demo')

export const usePatientsIdStore = defineStore({
  id: 'patientIds',
  state: () => ({
    hasLoadErrors: false,
    patients: [],
    selectedPatientId: '',
    isLoading: false,
    isPopulated: false,
  }),
  getters: {
    currentPatient: (state) => {
      return state.patients.find((patient) => patient.id === state.selectedPatientId)
    },

    getPatientByPatientId: (state) => {
      return (patientId) => {
        // if (state.isLoading && !state.isPopulated) {
        //   state.selectedPatientId = 'loading'
        //   return {
        //     id: 'loading',
        //     picture: null,
        //     name: 'Loading...',
        //     familyName: 'Loading',
        //     givenName: 'Still',
        //     preferredUsername: 'Loading...',
        //   }
        // }
        return state.patients.find((patient) => patient.id === patientId)
      }
    },
  },
  actions: {
    buildPatientName(patient) {
      if (patient.preferredUsername) {
        return patient.preferredUsername
      }
      return `${patient.givenName} ${patient.familyName}`
    },

    async fill() {
      this.isLoading = true
      const userStore = useSimpleUserStore()
      const patientIdList = userStore.getPatientIdList()
      for (let patientId of patientIdList) {
        await this.fillPatientIdData(patientId, userStore)
      }
      this.selectedPatientId = this.patients[0].id
      this.setAllClear()
    },

    async fillPatientIdData(patientId, userStore) {
      try {
        let patientIdRes = await api.get(`/patients/${patientId}/basicId`, userStore.withApiSettings())

        if (patientIdRes.status === 200 || patientIdRes.status === 304) {
          const patientData = await patientIdRes.json()
          if (patientData.status === 'success') {
            const patientInfo = patientData.data

            this.patients.push({
              id: patientId,
              picture: patientInfo.picture,
              familyName: patientInfo.familyName,
              givenName: patientInfo.givenName,
              name: this.buildPatientName(patientInfo),
              preferredUsername: null,
            })
          } else {
            console.log('jsend status other than success')
            console.log(patientData)
          }
        } else {
          console.log('api call returned other than success http status')
          console.log(patientIdRes)
        }
      } catch (err) {
        console.log(err)
      }
    },

    setActivePatient(patientId) {
      this.selectedPatientId = patientId
    },

    setAllClear() {
      this.hasLoadErrors = false
      this.isLoading = false
      this.isPopulated = true
    },

    setErrorState() {
      this.hasLoadErrors = true
      this.isLoading = false
      this.isPopulated = false
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePatientsIdStore, import.meta.hot))
}