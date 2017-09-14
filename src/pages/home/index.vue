<style type="text/scss" lang="scss" scoped>
  .block {
    margin-bottom: 20px;
    .title {
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px
    }
    .content {
      padding: 5px;
    }
    .item {
      display: flex;
      margin-bottom: 5px;
      label {
        flex: 1;
        margin-right: 10px;
        color: #20a0ff;
        cursor: pointer;
      }
      span {
        width: 150px;
        text-align: right;
      }
    }
  }
</style>

<template>
  <div class="pd20">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="block">
          <div class="title">待办任务<span class="fr" @click="toDetailPage(0)">更多</span></div>
          <div class="content">
            <div class="item" v-for="item in doingList" @click="see(0,item)">
              <label>{{item.procTitle}}</label>
              <span>{{item.startTime | formatDate}}</span>
            </div>
            <template v-if="!doingList.length">
              暂无数据
            </template>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="block">
          <div class="title">已办任务<span class="fr" @click="toDetailPage(1)">更多</span></div>
          <div class="content">
            <div class="item" v-for="item in doneList" @click="see(1,item)">
              <label>{{item.procTitle}}</label>
              <span>{{item.startTime | formatDate}}</span>
            </div>
            <template v-if="!doneList.length">
              暂无数据
            </template>
          </div>
        </div>
        <div class="block">
          <div class="title">我的发起<span class="fr" @click="toDetailPage(2)">更多</span></div>
          <div class="content">
            <div class="item" v-for="item in todoList" @click="see(2,item)">
              <label>{{item.procTitle}}</label>
              <span>{{item.startTime | formatDate}}</span>
            </div>
            <template v-if="!todoList.length">
              暂无数据
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Api from '@/api/process'
  import {procMap, processListMap} from '@/core/consts'
  import {formatDate} from '@/filters/moment'
  import localStore from 'store'

  const {userId} = localStore.get('user') || {}

  export default {
    data() {
      return {
        doingList: [],
        todoList: [],
        doneList: []
      }
    },
    methods: {
      getProcess(dataType, pageSize, list) {
        Api.getProcess({
          userId,
          pageNumber: 0,
          pageSize,
          dataType
        }).then((res) => {
          const {procList} = res.data.dataMap
          console.log(procList)
          this[list] = procList || []
        })
      },
      toDetailPage(type) {
        console.log(processListMap[type])
      },
      see(type, row) {
        console.log(row)
        const actualType = processListMap[type]
        const {procInstId, serialNumber, procCode} = row
        if (actualType === 'BACKLOG') {
          Api.getApproveNode({
            operatorId: userId,
            serialNumber,
            procCode
          }).then((res) => {
            const data = res.data.dataMap
            this.toPage(actualType, row, data)
          })
        } else {
          Api.getStartedProcNodes({
            procInstId,
            procCode
          }).then((res) => {
            const data = res.data.dataMap
            this.toPage(actualType, row, data)
          })
        }
      },
      toPage(type, row, data) {
        const {procInstId, serialNumber, procCode} = row
        const {actions, approveInfo} = data
        const {id} = approveInfo
        const show = type === 'BACKLOG'
        const processData = JSON.stringify({
          procInstId,
          actions,
          serialNumber,
          procCode,
          operatorId: userId,
          show
        })
        let url = ''
        switch (procCode) {
          case procMap[0]:
            url = `/contemplate/see?id=${id}&processData=${processData}`
            break
          default:
            return
        }
        this.$router.push(url)
      }
    },
    created() {
      this.getProcess(processListMap[0], 5, 'doingList')
      this.getProcess(processListMap[1], 3, 'todoList')
      this.getProcess(processListMap[2], 2, 'doneList')
    },
    filters: {
      formatDate
    }
  }
</script>
