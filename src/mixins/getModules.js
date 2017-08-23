import supportModel from '@/api/support';
import store from '../store';
import {SET_MODULES} from "../store/consts";

class support {
  static getModules() {
    let modules = store.state.support.modules;
    if (modules.length) {
      this.modulesData = modules;
      return;
    }
    supportModel.getModuleData({}).then((res) => {
      const modules = res.data.dataMap;
      this.modulesData = modules;
      store.commit(SET_MODULES, {
        data: modules
      });
    });
  }
}

export default {
  created() {
    support.getModules.call(this);
  }
};
