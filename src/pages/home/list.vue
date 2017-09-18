<style type="text/scss" lang="scss" scoped>
  .block {
    margin-bottom: 20px;
    .title {
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      span {
        cursor: pointer;
      }
    }
    .content {
      padding: 5px;
    }
    .item {
      display: flex;
      margin-bottom: 5px;
      label {
        flex: 1;
        padding-right: 10px;
        color: #20a0ff;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span {
        width: 150px;
        text-align: right;
      }
    }
  }
</style>

<template>
  <div class="block">
    <div class="title">{{title}}<span class="fr" @click="toDetailPage">更多</span></div>
    <div class="content">
      <div class="item" v-for="item in items" @click="toPage(item)">
        <label>{{item.procTitle}}</label>
        <span>{{item.startTime | formatDate}}</span>
      </div>
      <template v-if="!items.length">
        暂无数据
      </template>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/process'
  import {routerNames, processListMap} from '@/core/consts'
  import {formatDate} from '@/filters/moment'
  import toPage from '@/assets/js/toPage'

  export default {
    props: {
      title: {
        default: ''
      },
      pageSize: {
        default: 5
      },
      dataType: {
        default: processListMap[0]
      }
    },
    data() {
      return {
        items: []
      }
    },
    methods: {
      getProcess() {
        Api.getProcess({
          pageNumber: 0,
          pageSize: this.pageSize,
          dataType: this.dataType
        }).then((res) => {
          const {procList} = res.data.dataMap
          console.log(procList)
          this.items = procList || []
        })
      },
      toDetailPage() {
        let routerName = ''
        switch (this.dataType) {
          case processListMap[0]:
            routerName = routerNames.con_handing_process
            break
          case processListMap[1]:
            routerName = routerNames.con_create_process
            break
          case processListMap[2]:
            routerName = routerNames.con_handle_process
            break
        }
        this.$router.push({name: routerName})
      },
      toPage(row) {
        toPage.call(this, row)
      }
    },
    created() {
      this.getProcess()
    },
    filters: {
      formatDate
    }
  }
</script>
