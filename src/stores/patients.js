import { defineStore, acceptHMRUpdate } from "pinia"

export const useCareProviderStore = defineStore({
  id: 'careProviders',
  state: () => ({
    patients: [
      {
        patientId: '39817aa2-505f-4e78-bd67-279f7efc7125',
        providers: [
          {
            providerId: 'd3c0c15f9cb5:aed672'
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCareProviderStore, import.meta.hot))
}