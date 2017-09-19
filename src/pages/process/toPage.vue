<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>跳转中。。。</div>
</template>

<script>
  import {routerNames, tplMap, processListMap} from '@/core/consts'
  import Api from '@/api/process'

  export default {
    data() {
      return {dataType: ''}
    },
    methods: {
      getDataType() {
        const routeName = this.$route.name
        if (routeName === routerNames.con_process_approve) {
          this.dataType = processListMap[0]
        }
      },
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
        if (tplMap.indexOf(procCode) > -1) {
          name = routerNames.con_tpl_see
        } else {
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
    },
    created() {
      this.getDataType()

      const {procInstId, serialNumber, procCode} = this.$route.query
      this.see({procInstId, serialNumber, procCode})
    }
  }
</script>
