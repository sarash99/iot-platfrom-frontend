import API from '../api/api-class'
const protocol = 'http:'
// Smart api calls
const myAPI = new API({ url: `${protocol}//sarash99.pythonanywhere.com/` })
// const myAPI = new API({ url: `${protocol}//94.184.176.121`})

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
  commit('SET_TOKEN', token)
}

