import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: '/login', data: user, method: 'POST' })
          .then(response => {
            if(response.data.hasOwnProperty('user')){
              localStorage.setItem('access_token_type', response.data.token_type)
              localStorage.setItem('access_token', response.data.access_token)
              localStorage.setItem('session_data', JSON.stringify(response.data))
              axios.defaults.headers.common['Authorization'] = `${response.data.token_type} ${response.data.access_token}`
              commit('auth_success',
                response.data.access_token,
                response.data.user,
                response.data.roles,
                response.data.permission
                )
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
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.clear()
        sessionStorage.setItem('logout', 'logout')
        delete axios.defaults.headers.common['Authorization']
        resolve()
        return false;
      })
    },
    check({ commit }) {
      return new Promise((resolve, reject) => {
        const type = localStorage.getItem('access_token_type')
        const token = localStorage.getItem('access_token')
        if(type && token){
          axios.defaults.headers.common['Authorization'] = `${type} ${token}`
        }
        axios({url: '/token'})
          .then((response) => {
            if(response.data.hasOwnProperty('user')){
              commit('auth_success',
                response.data.access_token,
                response.data.user,
                response.data.roles,
                response.data.permission
              )
            }
            resolve(response)
          })
          .catch((error) => {
            localStorage.clear();
            sessionStorage.setItem('logout', 'logout')
            delete axios.defaults.headers.common['Authorization']
            reject(error)
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
