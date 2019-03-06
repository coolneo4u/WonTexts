import Vue from 'vue'
import Vuex from 'vuex'
import * as SharedFunctions from './sharedFunctions'
import { app } from './main'

Vue.use(Vuex)

const initButtonState = () => ({
  level: 0,
  0: ''
})
export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    indexes: [],
    selectedIndex: {},
    books: [],
    currentVerse: {},
    previousVerse: {},
    nextVerse: {},
    buttonState: initButtonState()
  },
  mutations: {
    setLocale(state, payload) {
      SharedFunctions.setCookie('locale', payload, -1)
      app.$i18n.locale = payload
      state.buttonState = initButtonState()
      state.currentVerse = {}
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
    },
    selectVerse(state) {
      const { buttonState } = state
      const key = buttonState[buttonState.level - 1]
      const book = buttonState[0]
      Vue.prototype.$http
        .get('http://localhost:3844/api/scriptures/get', {
          params: {
            doc_name: key,
            doc_id: `verse-${book}-${app.$i18n.locale}`
          }
        })
        .then(response => {
          console.log('response: ', response.data)
          state.currentVerse = response.data
        })
    }
  },
  actions: {
    // selectLanguage(context, language) {
    //   context.commit('setLanguage', language)
    // }
  }
})
