import * as types from './consts'

export default {
  namespaced: true,
  state: {
    busiType: [],
    modules: []
  },
  mutations: {
    [types.SET_BUSITYPE] (state, payload) {
      state.busiType = payload.data
    },
    [types.SET_MODULES] (state, payload) {
      state.modules = payload.data
    }
  }
}
