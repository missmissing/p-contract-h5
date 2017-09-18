<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>跳转中。。。</div>
</template>

<script>
  import {routerNames, processListMap} from '@/core/consts'
  import redirect from '@/mixins/redirect'

  export default {
    mixins: [redirect],
    methods: {
      getDataType() {
        const routeName = this.$route.name
        if (routeName === routerNames.con_process_approve) {
          this.dataType = processListMap[0]
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
