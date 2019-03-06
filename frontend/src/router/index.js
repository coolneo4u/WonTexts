import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../components/LoginPage'
import ScriptureDetailPage from '../components/ScriptureDetailPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ScriptureDetailPage',
      component: ScriptureDetailPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/scripture/:query',
      name: 'ScriptureDetailPage',
      component: ScriptureDetailPage
    }
  ]
})
