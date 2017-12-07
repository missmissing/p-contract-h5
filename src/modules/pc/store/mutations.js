import * as types from './consts';

export default {
  [types.ROUTE](state, payload) {
    state.route = payload.data;
  },
  [types.SET_FROM](state, payload) {
    state.from = payload.data;
  }
};
