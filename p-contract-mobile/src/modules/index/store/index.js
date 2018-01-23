import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import modules from './modules/index';

// 创建 store 实例
export default Vuex => (
  new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules
  })
);
