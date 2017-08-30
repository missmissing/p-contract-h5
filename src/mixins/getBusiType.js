/**
 * 依赖data中的regions，默认为[]
 */

import supportModel from '@/api/support'
import store from '../store'
import {SET_BUSITYPE} from '../store/consts'

class support {
  static getBusiType() {
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
  created() {
    support.getBusiType.call(this)
  }
}
