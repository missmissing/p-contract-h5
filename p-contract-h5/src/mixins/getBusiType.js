/**
 * 使用方法：提供regions属性，需要的地方直接使用
 */

import supportModel from '../api/support/index'
import store from '../store/index'
import { SET_BUSITYPE } from '../store/consts'

class Support {
  static getBusiType () {
    let regions = store.state.support.busiType
    if (regions.length) {
      this.regions = regions
      return
    }
    supportModel.getBusiType({}).then((res) => {
      regions = res.data.dataMap
      this.regions = regions
      store.commit(SET_BUSITYPE, {
        data: regions
      })
    })
  }
}

export default {
  data () {
    return {
      regions: []
    }
  },
  created () {
    Support.getBusiType.call(this)
  }
}
