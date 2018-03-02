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
    }, // 业务类型
    serviceFlag: false, // 是否为服务类
    textType: null // 文本类型
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
    },
    [types.SERVICEFLAG] (state, payload) {
      state.serviceFlag = payload.data
    },
    [types.TEXTTYPE] (state, payload) {
      state.textType = payload.data
    }
  }
}
