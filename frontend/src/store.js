import Vue from 'vue'
import Vuex from 'vuex'
import { app } from './main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    indexes: [],
    selectedIndex: {},
    books: [],
    currentVerse: '',
    previousVerse: '',
    nextVerse: '',
    buttonState: {
      level: 0,
      0: ''
    },
    locale: 'ko'
  },
  mutations: {
    setLocale(state, payload) {
      app.$i18n.locale = payload
    },
    updateButtonLevel(state, payload) {
      state.buttonState.level = payload
    },
    updateButtonState(state, payload) {
      const { level } = payload
      if (level === 0) {
        state.selectedIndex = state.indexes.filter(i => i.doc_name === payload.code)[0]['value']
      }
      state.buttonState.level = level + 1
      Vue.set(state.buttonState, level, payload.code)
      Vue.set(state.buttonState, level + 1, undefined)
      // TODO: comment below
      window.theState = state
    }
  },
  actions: {
    // selectLanguage(context, language) {
    //   context.commit('setLanguage', language)
    // }
  }
})
