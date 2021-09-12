import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login.vue'
import signup from '../components/Signup.vue'
import account from '../components/Account.vue'
import channel_view from '../components/ChannelView.vue'

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
  {
    path: '/account',
    name: 'account',
    component: account
  },
  {
    path: '/channel-view',
    name: 'channel-view',
    component: channel_view
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
