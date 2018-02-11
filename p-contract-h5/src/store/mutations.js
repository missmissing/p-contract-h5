import * as types from './consts'

export default {
  [types.ROUTE] (state, payload) {
    state.route = payload.data
  },
  [types.USERINFO] (state, payload) {
    state.userInfo = payload.data
  },
  [types.PROCESSSTATUS] (state, payload) {
    state.processStatus = payload.data
  },
  [types.PROCESSCREATORID] (state, payload) {
    state.processCreatorId = payload.data
  },
  [types.PROCESSROLE] (state, payload) {
    state.processRole = payload.data
  },
  [types.CURRENTSTATUS] (state, payload) {
    state.currentStatus = payload.data
  }
}
