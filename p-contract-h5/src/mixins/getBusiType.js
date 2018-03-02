/**
 * 使用方法：提供regions属性，需要的地方直接使用
 */

import supportModel from '../api/support'
import { SET_BUSITYPE } from '../store/modules/tpl/consts'

class Support {
  static getBusiType () {
    let regions = this.$store.state.tpl.busiType
    if (regions.length) {
      this.regions = regions
      return
    }
    supportModel.getBusiType({}).then((res) => {
      regions = res.data.dataMap
      this.regions = regions
      this.$store.commit(`tpl/${SET_BUSITYPE}`, {
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
