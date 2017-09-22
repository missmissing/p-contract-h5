<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>跳转中。。。</div>
</template>

<script>
  import {routerNames, tplMap, contractMap, processListMap} from '@/core/consts'
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
        const show = this.dataType === processListMap[0]
        const processData = JSON.stringify({
          procInstId,
          actions,
          serialNumber,
          procCode,
          show
        })
        if (tplMap.indexOf(procCode) > -1) {
          const {id} = approveInfo
          const param = {
            id
          }
          const name = routerNames.con_tpl_see
          this.$router.push({
            name,
            query: {
              ...param,
              processData
            }
          })
        } else if (contractMap.indexOf(procCode) > -1) {
          const {baseInfoForm} = approveInfo
          const {contractNo} = baseInfoForm
          const param = {
            contractNo
          }
          const name = routerNames.con_Check
          this.$router.push({
            name,
            query: {
              ...param,
              processData
            }
          })
        } else {
          console.log('找不到相应类型')
        }
      }
    },
    created() {
      this.getDataType()
      const {procInstId, serialNumber, procCode} = this.$route.query
      this.see({procInstId, serialNumber, procCode})
    }
  }
</script>
