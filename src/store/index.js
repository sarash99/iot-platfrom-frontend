import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'


Vue.use(Vuex)

const getDefaultState = () => {
  return {
    tokenScope: '',
    username: '',
    token: localStorage.getItem('token') || '',
    channel_name: localStorage.getItem('channel_name') || ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN_SCOPE (state, tokenScope) {
    state.tokenScope = tokenScope
  },
  SET_USERNAME (state, username) {
    state.username = username
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_CHANNEL_NAME (state, channel_name) {
    state.channel_name = channel_name
  },
}

export const store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
})

