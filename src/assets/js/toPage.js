import {routerNames, processListMap} from '@/core/consts'

export default function (row) {
  const {procInstId, serialNumber, procCode} = row
  const query = {
    procInstId,
    serialNumber,
    procCode
  }
  if (this.dataType === processListMap[0]) {
    this.$router.push({
      name: routerNames.con_process_approve,
      query
    })
  } else {
    this.$router.push({
      name: routerNames.con_process_see,
      query
    })
  }
}
