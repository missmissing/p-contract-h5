export default {
  getRouteName (state) {
    return state.route.to.name
  },
  isCreate (state) {
    return state.currentStatus === 0
  },
  isModify (state) {
    return state.currentStatus === 1
  },
  isSee (state) {
    return state.currentStatus === 2
  },
  isProcess (state) {
    return state.currentStatus === 3
  }
}
