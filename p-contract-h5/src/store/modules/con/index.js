import * as types from './consts'

export default {
  namespaced: true,
  state: {
    prFlag: false, // 是否有比价单
    contractType: null, // 合同模式
    contractBusinessType: {
      first: null,
      second: null,
      third: null
    } // 业务类型
  },
  mutations: {
    [types.PRFLAG] (state, payload) {
      state.prFlag = payload.data
    },
    [types.CONTRACTTYPE] (state, payload) {
      state.contractType = payload.data
    },
    [types.CONTRACTBUSINESSTYPE] (state, payload) {
      state.contractBusinessType = payload.data
    }
  }
}
