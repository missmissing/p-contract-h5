import * as types from "../consts";

export default {
  state: {
    info() {
      return {};
    }
  },
  mutations: {
    [types.GET_INFO](state, payload) {
      state.info = {...state.info, ...payload.info};
    }
  }
};
