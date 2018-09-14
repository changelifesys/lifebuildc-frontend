import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/member',
      name: 'member',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Member.vue')
    },
    {
      path: '/registration/:id',
      name: 'registration',
      props: true,
      component: () => import('./views/Registration.vue')
    },
    {
      path: '/fire',
      name: 'fire',
      props: true,
      component: () => import('./views/Fire.vue')
    },
    {
      path: '*',
      name: 'pageNotFound',
      component: () => import('./views/PageNotFound.vue')
    }
  ]
})
