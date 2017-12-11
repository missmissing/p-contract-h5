/**
 * 使用方法：提供modulesData属性，需要的地方直接使用
 */

import supportModel from '../api/support/index';
import store from '../store/index';
import { SET_MODULES } from '../store/consts';

class support {
  static getModules() {
    const { modules } = store.state.support;
    if (modules.length) {
      this.modulesData = modules;
      return;
    }
    supportModel.getModuleData().then((res) => {
      const data = res.data.dataMap;
      this.modulesData = data;
      store.commit(SET_MODULES, {
        data
      });
    });
  }
}

export default {
  data() {
    return {
      modulesData: []
    };
  },
  created() {
    support.getModules.call(this);
  }
};
