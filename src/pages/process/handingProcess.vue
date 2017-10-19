<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="pd20">
    <el-table
      :data="tableData"
      highlight-current-row
      border
      class="wp100">
      <el-table-column
        prop="procName"
        label="流程名称">
        <template slot-scope="scope">
          <el-button type="text" @click.native.prevent="toPage(scope.row)">{{scope.row.procTitle}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="procInstCode"
        label="流程编号">
      </el-table-column>
      <el-table-column
        prop="procTitle"
        label="流程标题">
      </el-table-column>
      <el-table-column
        prop="applicantName"
        label="发起人">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.startTime | formatTime }}
        </template>
      </el-table-column>
    </el-table>
    <div class="mt20">
      <el-pagination
        class="fr"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {processListMap} from '@/core/consts'
  import Api from '@/api/process'
  import {formatTime} from '@/filters/moment'
  import comLoading from '@/mixins/comLoading'
  import toPage from '@/assets/js/toPage'

  export default {
    mixins: [comLoading],
    data() {
      return {
        tableData: [],
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        dataType: processListMap[0]
      }
    },
    methods: {
      getProcess() {
        this.comLoading()
        Api.getProcess({
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          dataType: this.dataType
        }).then((res) => {
          this.comLoading(false)
          const {procList, totalPage} = res.data.dataMap
          this.tableData = procList
          this.totalPage = totalPage
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.getProcess()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pageNumber = val
        this.getProcess()
      },
      toPage(row) {
        toPage.call(this, row)
      }
    },
    created() {
      this.getProcess()
    },
    filters: {
      formatTime
    }
  }
</script>
