import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import IndexPage from '../components/IndexPage'
import LoginPage from '../components/LoginPage'

import MovieIndexPage from '../components/MovieIndexPage'
import MovieShowPage from '../components/MovieShowPage'

import ScriptureListPage from '../components/ScriptureListPage'
import ScriptureDetailPage from '../components/ScriptureDetailPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/movie',
      name: 'MovieIndexPage',
      component: MovieIndexPage
    },
    {
      path: '/movie/:id',
      name: 'MovieShowPage',
      component: MovieShowPage
    },
    {
      path: '/scriptures',
      name: 'ScriptureListPage',
      component: ScriptureListPage
    },
    {
      path: '/scripture/view',
      name: 'ScriptureDetailPage',
      component: ScriptureDetailPage
    }
  ]
})
