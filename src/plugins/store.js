import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('access_token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {}
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, data) {
      state.status = 'success'
      state.token = data.token
      state.type = data.type
      state.user = data.user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    },
    update_logged_in_user(state, user){
      state.status = 'updated'
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: '/login', data: user, method: 'POST' })
          .then(response => {
            if (response.data.hasOwnProperty('user')) {
              const token = response.data.access_token,
                type = response.data.token_type,
                user = response.data.user
              commit('auth_success', { type: type, token: token, user: user })
              localStorage.setItem('access_token', token)
              localStorage.setItem('access_token_type', type)
              localStorage.setItem('user', JSON.stringify(user))
              axios.defaults.headers.common['Authorization'] = `${type} ${token}`
            }
            resolve(response)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('access_token')
            reject(err)
          })
      })
    },
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: '/register', data: user, method: 'POST' })
          .then(response => {
            if (response.data.hasOwnProperty('user')) {
              const token = response.data.access_token,
                type = response.data.token_type,
                user = response.data.user
              commit('auth_success', { type: type, token: token, user: user })
              localStorage.setItem('access_token_type', type)
              localStorage.setItem('access_token', token)
              localStorage.setItem('user', JSON.stringify(user))
              axios.defaults.headers.common['Authorization'] = `${type} ${token}`
            }
            resolve(response)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('access_token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.clear()
        sessionStorage.setItem('logout', 'logout')
        axios({ url: '/logout' })
          .then(() => {
            delete axios.defaults.headers.common['Authorization']
          })
          .catch(() => {})
        resolve()
        return false
      })
    },
    check ({ commit }) {
      return new Promise(() => {
        let type = localStorage.getItem('access_token_type'),
          token = localStorage.getItem('access_token'),
          user = localStorage.getItem('user')
        if (type && token && user) {
          commit('auth_success', { type: type, token: token, user: JSON.parse(user) })
          axios.defaults.headers.common['Authorization'] = `${type} ${token}`
        }
        axios({ url: '/token' })
          .then(() => {})
          .catch(error => {})
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
  }
})
