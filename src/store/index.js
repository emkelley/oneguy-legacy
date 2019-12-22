import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const getDefaultState = () => {
  return {
    user: null,
    userId: null,
    userProfile: {},
    isAuthed: false,
    // nightMode: null,
    isAdmin: false
  }
}
export default new Vuex.Store({
  state: {
    user: null,
    userId: null,
    userProfile: {},
    isAuthed: false
    // nightMode: null,
  },
  getters: {
    isAuthed: state => state.isAuthed,
    user: state => state.user,
    userId: state => state.userId,
    userProfile: state => state.userProfile,
    isAdmin: state => state.isAdmin
  },
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState())
    },
    isAuthed(state, newValue) {
      state.isAuthed = newValue
    },
    setUser(state, payload) {
      state.user = payload
    },
    setUserId(state, payload) {
      state.userId = payload
    },
    setProfile(state, payload) {
      state.userProfile = payload
    },
    setAdmin(state, payload) {
      state.isAdmin = payload
    }
  },
  actions: {
    updateAuth(context) {
      context.commit('setAuth')
    },
    updateUser(context) {
      context.commit('setUser')
    },
    checkAdmin(context) {
      context.commit('setAdmin')
    },
    resetStateOnLogout({ commit }) {
      commit('resetState')
    }
  },
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== 'production'
})
