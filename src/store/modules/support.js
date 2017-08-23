import * as types from "../consts";

export default {
  state: {
    create: {
      info: {}
    },
    busiType: [],
    modules: []
  },
  mutations: {
    [types.SET_INFO](state, payload) {
      state.create.info = {...state.create.info, ...payload.info};
    },
    [types.SET_BUSITYPE](state, payload) {
      state.busiType = payload.data;
    },
    [types.SET_MODULES](state, payload) {
      state.modules = payload.data;
    }
  }
};
