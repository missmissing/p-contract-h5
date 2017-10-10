<template>
  <div>
    <el-table
      :data="tableData"
      border
      class="wp100">
      <el-table-column
        prop="priceCode"
        label="比价单编码">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="发起人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="createDepart"
        label="发起部门">
      </el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="formatDate"
        label="发起时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="processStatus"
        label="流程状态">
      </el-table-column>
      <el-table-column
        prop="endTime"
        :formatter="formatDate"
        label="结束时间"
        width="120">
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt20 mb20 fr"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import Api from '@/api/manageContract'
  import {formatDate} from '@/filters/moment'
  import comLoading from '@/mixins/comLoading'

  export default {
    mixins: [comLoading],
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        tableData: []
      }
    },
    methods: {
      getData() {
        this.comLoading()
        Api.getPriceTableData({}).then((res) => {
          const {list, total, pageSize} = res.data.dataMap
          this.tableData = list
          this.total = total
          this.pageSize = pageSize
          this.comLoading(false)
        }, () => {
          this.comLoading(false)
        })
      },
      formatDate(value) {
        return formatDate(value)
      },
      handleSizeChange(val) {
        this.pageSize = val
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      }
    },
    created() {
      this.getData()
    }
  }
</script>
