<style type="text/scss" lang="scss" scoped>
  .items {
    padding: 10px;
  }

  .item {
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  .header {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  .content {
    padding: 10px;
  }
</style>

<template>
  <div v-if="lists.length">
    <div class="items">
      <div class="item" v-for="list in lists" :key="list.commentId">
        <div class="header">
          <span>{{list.activityName}}</span>
          <span>{{list.approverName}}:</span>
          <span>{{list.actionName}}</span>
          <span class="fr">{{list.approveTime | formatTime}}</span>
        </div>
        <div class="content">{{list.comment}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../../../api/process'
  import {formatTime} from '../../../filters/moment'

  export default {
    data () {
      return {
        lists: []
      }
    },
    methods: {
      getLists () {
        const {procCode, procInstId} = this.$store.state.processData
        Api.getStartedProcNodes({
          procInstId,
          procCode
        }).then((res) => {
          this.lists = res.data.dataMap.nodes
        })
      }
    },
    created () {
      const processData = this.$store.state.processData
      if (!Object.keys(processData).length) {
        return
      }
      this.getLists()
    },
    filters: {
      formatTime
    }
  }
</script>
