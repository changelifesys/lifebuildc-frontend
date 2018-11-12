const state = {
  user: null
}

const getters = {
  userInfo: state => state.user
}

const actions = {
  addUser ({ commit }, user) {
    commit('setUser', user)
  },
  deleteUser ({ commit }) {
    commit('setUser', null)
  }
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
