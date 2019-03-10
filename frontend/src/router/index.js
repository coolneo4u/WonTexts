import Vue from 'vue'
import Router from 'vue-router'
import RegisterPage from '../components/RegisterPage'
import ScriptureDetailPage from '../components/ScriptureDetailPage'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'ScriptureDetailPage', component: ScriptureDetailPage },
    { path: '/register', name: 'RegisterPage', component: RegisterPage },
    { path: '/scripture/:query', name: 'ScriptureDetailPage', component: ScriptureDetailPage },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/register', '/scripture/:query']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})
