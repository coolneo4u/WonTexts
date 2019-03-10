import { userService } from '../services/user.service'
import { router } from '../router/index'

const user = JSON.parse(localStorage.getItem('user'))
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null }

const actions = {
  login({ dispatch, commit }, { email, password }) {
    commit('loginRequest', { email })

    return userService.login(email, password).then(
      user => {
        console.log('login success')
        commit('loginSuccess', user)
        setTimeout(() => {
          // display success message after route change completes
          dispatch('alert/success', 'loginSuccess', { root: true })
        })
        return user
      },
      error => {
        console.log('loin failed. :(')
        commit('loginFailure', error)
        dispatch('alert/error', 'loginFail')
      }
    )
  },
  logout({ commit }) {
    userService.logout()
    commit('logout')
  },
  register({ dispatch, commit }, user) {
    commit('registerRequest', user)

    return userService.register(user).then(
      user => {
        commit('registerSuccess', user)
        setTimeout(() => {
          // display success message after route change completes
          dispatch('alert/success', 'registerSuccess', { root: true })
        })
        return user
      },
      error => {
        commit('registerFailure', error)
        dispatch('alert/error', 'registerFail', { root: true })
      }
    )
  }
}

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true, message: 'loggingIn' }
    state.user = user
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true, message: 'success' }
    state.user = user
    console.log('state: ', state)
  },
  loginFailure(state) {
    state.status = { message: 'failed' }
    state.user = null
  },
  logout(state) {
    state.status = {}
    state.user = null
  },
  registerRequest(state, user) {
    state.status = { registering: true }
  },
  registerSuccess(state, user) {
    state.status = { loggedIn: true, message: 'success' }
    state.user = user
  },
  registerFailure(state, error) {
    state.status = { message: 'failed' }
  }
}

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
}
