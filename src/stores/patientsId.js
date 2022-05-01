import { defineStore, acceptHMRUpdate } from 'pinia'
import { useSimpleUserStore } from '@/stores/simpleUser'
import { mande } from 'mande'

// Hard coding an authorization header for local dev
// This will come from the user store and AWS Cognito in prod
const api = mande('/demo', { headers: { authorization: 'this-is-fine' } })

export const usePatientIdStore = defineStore({
  id: 'patientIds',
  state: () => ({
    patients: [
      {
        patientId: '39817aa2-505f-4e78-bd67-279f7efc7125',
        name: {
          given: 'John',
          surname: 'Doe',
        },
        avatar: null
      },
      {
        patientId: '0da9da80-8538-4139-a208-c03d319dbc05',
        name: {
          given: 'Jane',
          surname: 'Doe',
        },
        avatar: 'https://bulma.io/images/placeholders/128x128.png'
      }
    ],
    selectedPatient: '',
    isLoading: false,
  }),
  getters: {
    getPatientByPatientId: (state) => {
      return (patientId) => state.patients.find((patient) => patient.patientId === patientId)
    }
  },
  actions: {
    async fill() {
      const userStore = useSimpleUserStore()
      const patientIdList = userStore.getPatientIdList()
      patientIdList.forEach((patient) => {
        try {
          let patientIdRes = await api.get(`/patients/${patient}/basicId`, { responseAs: 'response' })

          if (patientIdRes.status === 200 || patientIdRes.status === 304) {
            const patientData = await patientIdRes.json()
            if (patientData.status === 'success') {
              const patientInfo = patientData.data
              this.patients.push({ patientId: patient, avatar: patientInfo.avatarUri, name: { given: patientData.name.given, surname: patientData.name.surname } })
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
  import.meta.hot.accept(acceptHMRUpdate(usePatientIdStore, import.meta.hot))
}