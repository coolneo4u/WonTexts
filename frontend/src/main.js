// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import * as SharedFunctions from './sharedFunctions'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.prototype.$http = axios

Vue.config.productionTip = false

const messages = {
  en: {
    message: {
      title: 'The Scriptures of WonBuddhism',
      selectBook: 'Select Book',
      select: 'Select'
    }
  },
  ko: {
    message: {
      title: '원불교 교전',
      selectBook: '교전을 선택하세요',
      select: '선택하세요'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: SharedFunctions.getCookie('locale') || 'ko',
  messages
})

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
