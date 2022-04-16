import { defineStore } from "pinia"

export const useCareProviderStore = defineStore({
  id: 'careProviders',
  state: () => ({
    patients: [
      {
        patientId: '39817aa2-505f-4e78-bd67-279f7efc7125',
        providers: [
          {
            providerId: 'ac9e9a4e:d3c0c15f9cb5'
          }
        ]
      }
    ]
  }),
  getters: {
    getPatientByPatientId: (state) => {
      return (patientId) => state.patients.find((patient) => patient.patientId === patientId)
    }
  }
})