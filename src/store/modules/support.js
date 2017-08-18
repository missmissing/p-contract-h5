import * as types from "../consts";

export default {
  state: {
    create: {
      info: {}
    },
    tplInfo: {}
  },
  mutations: {
    [types.SET_INFO](state, payload) {
      state.create.info = {...state.create.info, ...payload.info};
    },
    [types.SET_TPL_INFO](state, payload) {
      state.tplInfo = {...state.tplInfo, ...payload.tplInfo};
    }
  }
};
