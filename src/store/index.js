import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage // or window.localStorage or localForage
})
const getDefaultState = () => {
  return {
    user: null,
    userId: null,
    userDisplayName: null,
    userAvatar: null,
    isAuthed: false,
    userProfile: null
  }
}
export default new Vuex.Store({
  state: {
    user: null,
    userId: null,
    userDisplayName: null,
    userAvatar: null,
    userProfile: null,
    isAuthed: false
  },
  getters: {
    isAuthed: state => state.isAuthed,
    user: state => state.user,
    userId: state => state.userId,
    userProfile: state => state.userProfile,
    userDisplayName: state => state.userDisplayName,
    userAvatar: state => state.userAvatar,
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
    setUserProfile(state, payload) {
      state.userProfile = payload
    },
    setUserId(state, payload) {
      state.userId = payload
    },
    setUserDisplayName(state, payload) {
      state.userDisplayName = payload
    },
    setUserAvatar(state, payload) {
      state.userAvatar = payload
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
  plugins: [vuexLocalStorage.plugin],
  strict: process.env.NODE_ENV !== 'production'
})
