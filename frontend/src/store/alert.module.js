const state = {
  type: null,
  message: null
}

const actions = {
  success({ commit }, message) {
    commit('success', message)
  },
  error({ commit }, message) {
    commit('error', message)
  },
  clear({ commit }, message) {
    commit('success', message)
  }
}

const mutations = {
  success(state, message) {
    state.type = 'green'
    state.message = message
  },
  error(state, message) {
    state.type = 'red darken-3'
    state.message = message
  },
  clear(state) {
    state.type = null
    state.message = null
  }
}

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations
}
