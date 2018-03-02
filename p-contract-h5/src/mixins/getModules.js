/**
 * 使用方法：提供modulesData属性，需要的地方直接使用
 */

import supportModel from '../api/support'
import { SET_MODULES } from '../store/modules/tpl/consts'

class support {
  static getModules () {
    const { modules } = this.$store.state.tpl
    if (modules.length) {
      this.modulesData = modules
      return
    }
    supportModel.getModuleData().then((res) => {
      const data = res.data.dataMap
      this.modulesData = data
      this.$store.commit(`tpl/${SET_MODULES}`, {
        data
      })
    })
  }
}

export default {
  data () {
    return {
      modulesData: []
    }
  },
  created () {
    support.getModules.call(this)
  }
}
