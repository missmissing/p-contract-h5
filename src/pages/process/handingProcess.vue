<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="pd20">
    <el-table
      :data="tableData"
      highlight-current-row
      v-loading="loadingFlag"
      :element-loading-text="loadingText"
      border
      class="wp100">
      <el-table-column
        prop="procTitle"
        label="流程名称">
        <template scope="scope">
          <el-button type="text" @click.native.prevent="see(scope.$index,scope.row)">{{scope.row.procTitle}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="procCode"
        label="流程编号">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="创建时间">
        <template scope="scope">
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
  import {procMap} from '@/core/consts'
  import Api from '@/api/process'
  import comLoading from '@/mixins/comLoading'
  import {formatTime} from '@/filters/moment'

  export default {
    mixins: [comLoading],
    data() {
      return {
        tableData: [],
        pageNumber: 0,
        pageSize: 10,
        totalPage: 0,
        userId: '51006793',
        dataType: 'BACKLOG'
      }
    },
    methods: {
      getProcess() {
        this.comLoading(1)
        Api.getProcess({
          userId: this.userId,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          dataType: this.dataType
        }).then((res) => {
          this.comLoading()
          const {procList, totalPage} = res.data.dataMap
          this.tableData = procList
          this.totalPage = totalPage
        })
      },
      see(index, row) {
        console.log(row)
        const {procInstId, serialNumber, procCode} = row
        Api.getApproveNode({
          operatorId: this.userId,
          serialNumber,
          procCode
        }).then((res) => {
          const data = res.data.dataMap
          const {actions, approveInfo} = data
          const {id} = approveInfo
          const processData = JSON.stringify({
            procInstId,
            actions,
            serialNumber,
            procCode,
            operatorId: this.userId
          })
          let url = ''
          switch (procCode) {
            case procMap['template']:
              url = `/contemplate/see?id=${id}&processData=${processData}`
              break
            default:
              return
          }
          this.$router.push(url)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pageNumber = val
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
