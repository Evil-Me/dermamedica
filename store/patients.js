export const state = () => ({
  patients: []
})

export const mutations = {
  addAllPatients (state, patients) {
    state.patients = patients
  }
}

export const getters = {
  patients: state => {
    return state.patients
  }
}
