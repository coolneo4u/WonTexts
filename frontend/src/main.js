// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import { router } from './router/index'
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
    },
    login: {
      title: 'Enter email & password',
      titleRegister: 'Creating a new account',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      loggingIn: 'Loggin in...',
      failed: 'Log in failed. Please check email & password',
      success: 'Log in success'
    },
    alert: {
      registerSuccess: 'Registered successfully',
      loginSuccess: 'Welcome back',
      registerFail: 'Error occured during registration',
      loginFail: 'Login failed'
    }
  },
  ko: {
    message: {
      title: '원불교 교전',
      selectBook: '교전을 선택하세요',
      select: '선택하세요'
    },
    login: {
      title: '이메일과 패스워드를 입력하세요',
      titleRegister: '새로운 계정을 등록합니다',
      login: '로그인',
      logout: '로그아웃',
      register: '계정 등록',
      loggingIn: '로그인하는 중입니다',
      failed: '로그인이 실패했습니다. 이메일과 비밀번호를 확인해보세요',
      success: '로그인이 성공했습니다'
    },
    alert: {
      registerSuccess: '성공적으로 등록되었습니다',
      loginSuccess: '반갑습니다',
      registerFail: '등록하는 가운데 문제가 발생했습니다',
      loginFail: '로그인에 실패했습니다'
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
