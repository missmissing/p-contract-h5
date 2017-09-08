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
  import {procCode} from '@/core/consts'
  import Api from '@/api/process'
  import comLoading from '@/mixins/comLoading'

  export default {
    mixins: [comLoading],
    data() {
      return {
        tableData: [],
        pageNumber: 0,
        pageSize: 10,
        totalPage: 0,
        userId: '',
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
        const {serialNumber, procCode} = row
        Api.getApproveNode({
          operatorId: '',
          serialNumber,
          procCode
        }).then((res) => {
          const {approveInfo} = res.data.dataMap
          const {id} = approveInfo
          let url = ''
          switch (procCode) {
            case procCode['template']:
              url = `/contemplate/see?id=${id}`
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
    }
  }
</script>
