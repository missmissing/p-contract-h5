import * as types from './consts'

export default {
  [types.GET_PROCESSDATA] (state, payload) {
    state.processData = payload.data
  },
  [types.GET_ID] (state, payload) {
    state.id = payload.data
  }
}
