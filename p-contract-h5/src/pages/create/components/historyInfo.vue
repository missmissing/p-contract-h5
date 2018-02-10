<template>
  <el-table :data="items">
    <el-table-column prop="procInstId" label="流程id">
      <template slot-scope="scope">
        <div v-if="[2,4].indexOf(scope.row.contractType)>-1||!scope.row.procInstId">自动创建</div>
        <div class="router-link" @click="goToProcess(scope.row)" v-else>
          {{scope.row.procInstId}}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="operatorName" label="操作者"></el-table-column>
    <el-table-column prop="operateTime" label="操作时间">
      <template slot-scope="scope">{{scope.row.operateTime | formatDate}}</template>
    </el-table-column>
    <el-table-column prop="operateType" label="操作类型"></el-table-column>
  </el-table>
</template>

<script>
  import {formatDate} from '../../../filters/moment'
  import toPage from '../../../assets/js/toPage'

  export default {
    name: 'history-info',
    props: {
      items: Array
    },
    methods: {
      goToProcess (row) {
        toPage.call(this, row)
      }
    },
    filters: {
      formatDate
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
