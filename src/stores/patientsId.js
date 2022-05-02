import { defineStore, acceptHMRUpdate } from 'pinia'
import { useSimpleUserStore } from '@/stores/simpleUser'
import { mande } from 'mande'

// Hard coding an authorization header for local dev
// This will come from the user store and AWS Cognito in prod
const api = mande('/demo')

export const usePatientsIdStore = defineStore({
  id: 'patientIds',
  state: () => ({
    patients: [],
    selectedPatient: '',
    isLoading: false,
  }),
  getters: {
    getPatientByPatientId: (state) => {
      return (patientId) => {
        if (!state.isLoading) {
          state.selectedPatient = 'loading'
          return {
            id: 'loading',
            picture: null,
            name: {
              given_name: 'Still',
              family_name: 'Loading',
              preferred_username: 'Loading...',
            }
          }
        }
        state.patients.find((patient) => patient.patientId === patientId)
      }
    },
  },
  actions: {
    async fill() {
      this.isLoading = true
      const userStore = useSimpleUserStore()
      const patientIdList = userStore.getPatientIdList()
      await patientIdList.forEach(async (patientId) => {
        try {
          let patientIdRes = await api.get(`/patients/${patientId}/basicId`, userStore.withApiSettings())

          if (patientIdRes.status === 200 || patientIdRes.status === 304) {
            const patientData = await patientIdRes.json()
            if (patientData.status === 'success') {
              const patientInfo = patientData.data
              this.patients.push({ id: patientId, picture: patientInfo.picture, name: { given_name: patientInfo.name.given_name, family_name: patientInfo.name.family_name, preferred_username: null } })
              this.selectedPatient = this.patients[0].id
              this.isLoading = false
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
      })
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePatientsIdStore, import.meta.hot))
}