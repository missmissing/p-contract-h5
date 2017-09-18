import {routerNames, procMap, processListMap} from '@/core/consts'
import Api from '@/api/process'

export default {
  data() {
    return {dataType: ''}
  },
  methods: {
    see(row) {
      console.log(row)
      const {procInstId, serialNumber, procCode} = row
      if (this.dataType === processListMap[0]) {
        Api.getApproveNode({
          serialNumber,
          procCode
        }).then((res) => {
          const data = res.data.dataMap
          this.toPage(row, data)
        })
      } else {
        Api.getStartedProcNodes({
          procInstId,
          procCode
        }).then((res) => {
          const data = res.data.dataMap
          this.toPage(row, data)
        })
      }
    },
    toPage(row, data) {
      const {procInstId, serialNumber, procCode} = row
      const {actions, approveInfo} = data
      const {id} = approveInfo
      const show = this.dataType === processListMap[0]
      const processData = JSON.stringify({
        procInstId,
        actions,
        serialNumber,
        procCode,
        show
      })
      let name = ''
      switch (procCode) {
        case procMap[0]:
          name = routerNames.con_tpl_see
          break
        default:
          return
      }
      this.$router.push({
        name,
        query: {
          id,
          processData
        }
      })
    }
  }
}
