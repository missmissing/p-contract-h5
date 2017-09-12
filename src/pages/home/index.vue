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
      label {
        flex: 1;
        margin-right: 10px;
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
          <div class="title">待办任务<span class="fr">更多</span></div>
          <div class="content">
            <div class="item" v-for="item in doingList">
              <label>{{item.procTitle}}</label>
              <span>{{item.startTime | formatTime}}</span>
            </div>
            <template v-if="!!doingList.length">
              暂无数据
            </template>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="block">
          <div class="title">已办任务<span class="fr">更多</span></div>
          <div class="content">
            <div class="item" v-for="item in doneList">
              <label>{{item.procTitle}}</label>
              <span>{{item.startTime | formatTime}}</span>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="title">我的发起<span class="fr">更多</span></div>
          <div class="content">
            <div class="item" v-for="item in todoList">
              <label>{{item.procTitle}}</label>
              <span>{{item.startTime | formatTime}}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Api from '@/api/process'
  import {processListMap} from '@/core/consts'
  import {formatTime} from '@/filters/moment'

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
          userId: '51006793',
          pageNumber: 0,
          pageSize,
          dataType
        }).then((res) => {
          const {procList = []} = res.data.dataMap
          console.log(procList)
          this[list] = procList
        })
      }
    },
    created() {
      this.getProcess(processListMap[0], 5, 'doingList')
      this.getProcess(processListMap[1], 3, 'todoList')
      this.getProcess(processListMap[2], 2, 'doneList')
    },
    filters: {
      formatTime
    }
  }
</script>
