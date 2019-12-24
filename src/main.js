import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import store from './store'
import Buefy from 'buefy'
import { firebase } from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment
Vue.use(require('vue-moment'))

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})

const firebaseConfig = {
  apiKey: 'AIzaSyB0NkfdZpOo001ixL3yJT6y24udUwuGfNw',
  authDomain: 'oneguyio.firebaseapp.com',
  databaseURL: 'https://oneguyio.firebaseio.com',
  projectId: 'oneguyio',
  storageBucket: 'oneguyio.appspot.com',
  messagingSenderId: '623707145571',
  appId: '1:623707145571:web:2ccdf739b4801d8d3cbf56'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()

let app = ''

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
