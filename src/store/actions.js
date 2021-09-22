import API from '../api/api-class'
const protocol = 'http:'
// Smart api calls
const myAPI = new API({ url: `${protocol}//sarash99.pythonanywhere.com/api` })
// const myAPI = new API({ url: `${protocol}//127.0.0.1:8000/api` })

export const handleRequestResponse = async ({ commit }, { mutation, request }) => {
  commit(mutation, await request)
}

export const handleRequest = async ({ dispatch, commit }, params = {}) => {
  let { name, action, mutation, data, tokenScope } = params
  let match = name.match(/\bauth/g)
  if (match === null) {
    name = `${name}`
  }
  if (!data) {
    data = {}
  }
  if (!mutation) {
    mutation = null
  }
  if (!tokenScope) {
    tokenScope = ''
  }
  commit('SET_TOKEN_SCOPE', tokenScope)
  myAPI.createEntity({ name })
  const request = myAPI.endpoints[name][action](data)
  if (mutation !== null) {
    await dispatch('handleRequestResponse', { mutation, request })
  } else {
    return request
  }
}

// // End smart api calls
export const setUsername = async ({ commit }, username) => {
  commit('SET_USERNAME', username)
}
export const setToken = ({ commit }, token) => {
  localStorage.setItem('token', token)
  commit('SET_TOKEN', token)
}
export const setChannelName = ({ commit }, channel_name) => {
  localStorage.setItem('channel_name', channel_name)
  commit('SET_CHANNEL_NAME', channel_name)
}

