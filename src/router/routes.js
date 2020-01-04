import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '@firebase/app'
import '@firebase/auth'
import store from '../store'

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
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "Register" */ '@/views/About.vue')
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
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/error/404',
      name: '404',
      component: () =>
        import(/* webpackChunkName: "Error404" */ '@/views/error/404.vue')
    },
    {
      path: '/error/403',
      name: '403',
      component: () =>
        import(/* webpackChunkName: "Error403" */ '@/views/error/403.vue')
    },
    { path: '*', redirect: '/error/404' }
  ]
})
// )
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (requiresAuth && !currentUser) next('login')
  else if (requiresAdmin && !store.state.userProfile.isAdmin)
    next({ name: '403' })
  else next()
})

export default router
