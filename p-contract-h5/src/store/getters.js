import {processListMap} from '../core/consts'

export default {
  getRouteName (state) {
    return state.route.to.name
  },
  // 待办流程
  backLog (state) {
    const {pageStatus, processStatus} = state
    if (pageStatus === 4) {
      return processStatus === processListMap[0]
    }
    return false
  },
  // 当前用户为待办流程发起人
  backLogCreator (state, getters) {
    const {userInfo, processCreatorId} = state
    const {backLog} = getters
    if (backLog && userInfo) {
      return userInfo.userId === processCreatorId
    }
    return false
  },
  // 当前用户角色为待办流程FA
  backLogFARole (state, getters) {
    const {processRole} = state
    const {backLog} = getters
    if (backLog && processRole) {
      return processRole.indexOf('FA') > -1
    }
    return false
  },
  // 当前用户角色为待办流程印章保管人
  backLogSealRole (state, getters) {
    const {processRole} = state
    const {backLog} = getters
    const reg = /印章保管人/g
    if (backLog && processRole) {
      return reg.test(processRole)
    }
    return false
  },
  // 当前用户角色为待办流程采购合同上传
  backLogPurchaseRole (state, getters) {
    const {processRole} = state
    const {backLog} = getters
    const reg = /采购合同上传/g
    if (backLog && processRole) {
      return reg.test(processRole)
    }
    return false
  }
}
