import Vue from 'vue'
import Vuex from 'vuex'
import * as SharedFunctions from './sharedFunctions'
import { app } from './main'

import { alert } from './store/alert.module'
import { account } from './store/account.module'
import { users } from './store/user.module'

Vue.use(Vuex)

const initButtonState = () => ({
  level: 0,
  0: ''
})
export default new Vuex.Store({
  modules: {
    alert,
    account,
    users
  },
  state: {
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
    },
    selectVerse(state, payload) {
      const { buttonState } = state
      const book = buttonState[0]
      let theKey = buttonState[buttonState.level - 1]
      const oldKey = theKey
      if (['next', 'previous'].includes(payload)) {
        if (!state.currentVerse.doc_name) return
        const theIndex = state.selectedIndex
        let indexInt = 0
        for (let [i, key] of Object.keys(theIndex).entries()) {
          if (key === state.currentVerse.doc_name) indexInt = i
        }
        let isRoot = true
        while (isRoot) {
          let newIndexInt
          if (payload === 'next') {
            newIndexInt = Math.min(indexInt + 1, Object.keys(theIndex).length - 1)
          } else {
            newIndexInt = Math.max(indexInt - 1, 0)
          }
          if (indexInt === newIndexInt) return
          else indexInt = newIndexInt
          const newKey = Object.keys(theIndex)[indexInt]
          isRoot = theKey.split('-').length !== newKey.split('-').length
          console.log('theKey: ', theKey)
          console.log('newKey: ', newKey)
          if (!isRoot) theKey = newKey
        }
        for (let [i, v] of oldKey.split('-').entries()) {
          if (i === 0 || i === oldKey.split('-').length - 1) continue
          const comps = theKey.split('-')
          if (comps[i] !== v) state.buttonState[i] = comps.slice(0, i + 1).join('-')
        }
        state.buttonState[buttonState.level - 1] = theKey
      }
      Vue.prototype.$http
        .get('http://localhost:3844/api/scriptures/get', {
          params: {
            doc_name: theKey,
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
