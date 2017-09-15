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
          <el-button type="text" @click.native.prevent="see(scope.row)">{{scope.row.procTitle}}</el-button>
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
  import {processListMap, routerNames} from '@/core/consts'
  import Api from '@/api/process'
  import comLoading from '@/mixins/comLoading'
  import {formatTime} from '@/filters/moment'
  import redirect from '@/mixins/redirect'

  export default {
    mixins: [comLoading, redirect],
    data() {
      return {
        tableData: [],
        pageNumber: 0,
        pageSize: 10,
        totalPage: 0,
        dataType: processListMap[0]
      }
    },
    methods: {
      getProcess() {
        this.comLoading(1)
        Api.getProcess({
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
      getDataType() {
        const routeName = this.$route.name
        switch (routeName) {
          case routerNames.con_handing_process :
            this.dataType = processListMap[0]
            break
          case routerNames.con_create_process :
            this.dataType = processListMap[1]
            break
          case routerNames.con_handle_process :
            this.dataType = processListMap[2]
            break
        }
      }
    },
    created() {
      this.getDataType()
      this.getProcess()
    },
    filters: {
      formatTime
    },
    watch: {
      '$route'() {
        this.getDataType()
        this.getProcess()
      }
    }
  }
</script>
