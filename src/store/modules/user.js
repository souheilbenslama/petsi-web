import firebase from 'firebase/app'
import 'firebase/auth'
import { currentUser } from '../../constants/config'
import apiAxios from '../../services/axios'

export default {
  state: {
    currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
    loginError: null,
    processing: false,
    forgotMailSuccess:null,
    resetPasswordSuccess:null,
    token: null,
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess:state => state.resetPasswordSuccess,
    token: state => state.token,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload.user
      state.processing = false
      state.loginError = null
      state.token = payload.token
    },
    updateUser(state, payload) {
      state.currentUser = payload.user
      state.processing = false
      state.loginError = null
    },
    setLogout(state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
      state.token = null
    },
    setProcessing(state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError(state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    setForgotMailSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.forgotMailSuccess=true
    },
    setResetPasswordSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.resetPasswordSuccess=true
    },
    clearError(state) {
      state.loginError = null
    }
  },
  actions: {
    updateProfile({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      let data = payload
      const item = { _id: data.user._id }
        localStorage.setItem('user', JSON.stringify(item))
        data = {
          user: {
            _id: data.user._id,
            img: "/assets/img/profile-pic-2.jpg",
            title: data.user.name + " " + data.user.surname,
            user: data.user
          },
        }
        commit('updateUser', data)
    },
    login({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)

      apiAxios.post('/login',payload)
      .then((res) => {
        let data = res.data;
        console.log(data)
        const item = { _id: data.user._id }
        localStorage.setItem('user', JSON.stringify(item))
        localStorage.setItem('token', data.token)
        let payload = {
          user: {
            _id: data.user._id,
            img: "/assets/img/profile-pic-2.jpg",
            title: data.user.name + " " + data.user.surname,
            user: data.user
          },
          token: data.token,
        }
        commit('setUser', payload)
      })
      .catch(e => {
        localStorage.removeItem('user')
        commit('setError', e)
        setTimeout(() => {
          commit('clearError')
        }, 3000)
      })
    },
    forgotPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(
          user => {
            commit('clearError')
            commit('setForgotMailSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    resetPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .confirmPasswordReset(payload.resetPasswordCode,payload.newPassword)
        .then(
          user => {
            commit('clearError')
            commit('setResetPasswordSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },



    /*
       return await auth.(resetPasswordCode, newPassword)
        .then(user => user)
        .catch(error => error);
    */
    signOut({ commit }) {
        localStorage.removeItem('user')
        commit('setLogout')
    }
  }
}
