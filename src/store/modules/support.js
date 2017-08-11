import * as types from "../consts";

export default {
  state: {
    create: {
      initialData: {},
      info: {}
    }
  },
  mutations: {
    [types.GET_INTIALDATA](state, payload) {
      state.create.initialData = {...state.create.initialData, ...payload.initialData};
    },
    [types.GET_INFO](state, payload) {
      state.create.info = {...state.create.info, ...payload.info};
    }
  }
};
