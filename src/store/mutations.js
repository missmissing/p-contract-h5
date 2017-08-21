import * as types from "./consts";

export default {
  [types.ROUTE](state, payload) {
    state.route = payload.data;
  }
};
