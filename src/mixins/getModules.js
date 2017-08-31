/**
 * 使用方法：提供modulesData属性，需要的地方直接使用
 */

import supportModel from '@/api/support'
import store from '../store'
import {SET_MODULES} from '../store/consts'

class support {
  static getModules() {
    let modules = store.state.support.modules
    if (modules.length) {
      this.modulesData = modules
      return
    }
    supportModel.getModuleData({}).then((res) => {
      const modules = res.data.dataMap
      this.modulesData = modules
      store.commit(SET_MODULES, {
        data: modules
      })
    })
  }
}

export default {
  data() {
    return {
      modulesData: []
    }
  },
  created() {
    support.getModules.call(this)
  }
}
