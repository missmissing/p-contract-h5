import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import modules from './modules/index'

Vue.use(Vuex)

// 创建 store 实例
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules
})
