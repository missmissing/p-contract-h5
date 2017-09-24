<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="pd20">
    <el-row :gutter="20">
      <el-col :span="12">
        <List title="待办任务" :pageSize="doing.pageSize" :dataType="doing.dataType"></List>
      </el-col>
      <el-col :span="12">
        <el-row>
          <List title="我发起的" :pageSize="done.pageSize" :dataType="done.dataType"></List>
        </el-row>
        <el-row class="mb20">
          <List title="已办任务" :pageSize="todo.pageSize" :dataType="todo.dataType"></List>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {processListMap} from '@/core/consts'
  import List from './list.vue'

  export default {
    data() {
      return {
        doingList: [],
        todoList: [],
        doneList: [],
        doing: {
          pageSize: 5,
          dataType: processListMap[0]
        },
        done: {
          pageSize: 3,
          dataType: processListMap[2]
        },
        todo: {
          pageSize: 2,
          dataType: processListMap[1]
        }
      }
    },
    methods: {},
    created() {

    },
    components: {
      List
    }
  }
</script>
