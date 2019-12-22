import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '@firebase/app'
import '@firebase/auth'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "Login" */ '@/views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "Register" */ '@/views/auth/Register.vue')
    },
    {
      path: '/cinematics',
      name: 'cinematics',
      component: () =>
        import(
          /* webpackChunkName: "CinematicsHome" */ '@/views/cinematics/CinematicsHome.vue'
        )
    },
    {
      path: '/cinematics/:gameId',
      name: 'cinematicsGame',
      component: () =>
        import(
          /* webpackChunkName: "CinematicsGame" */ '@/views/cinematics/CinematicsGame.vue'
        )
    },
    {
      path: '/cinematics/:gameId/:mapId',
      name: 'cinematicsMap',
      component: () =>
        import(
          /* webpackChunkName: "CinematicsMap" */ '@/views/cinematics/CinematicsMap.vue'
        )
    },
    {
      path: '/account',
      name: 'account',
      component: () =>
        import(/* webpackChunkName: "Account" */ '@/views/user/Account.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: () =>
        import(/* webpackChunkName: "Account" */ '@/views/admin/Admin.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/error/404',
      name: '404',
      component: () =>
        import(/* webpackChunkName: "Error404" */ '@/views/error/404.vue')
    },
    { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('login')
  else next()
})

// Google Analytics (dencapdentalplans@gmail.com)
// Vue.use(VueAnalytics, {
//   id: 'UA-68952214-5',
//   router
// })

export default router
