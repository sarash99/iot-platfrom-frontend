import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login.vue'
import signup from '../components/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
