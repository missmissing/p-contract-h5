<template>
  <div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      border
      class="wp100">
      <el-table-column
        prop="contractCode"
        label="合同号">
      </el-table-column>
      <el-table-column
        prop="prOrder"
        label="采购订单">
      </el-table-column>
      <el-table-column
        prop="totalWithTax"
        label="含税总金额">
      </el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="formatDate"
        label="发起时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="下单时间"
        :formatter="formatDate"
        width="150">
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
  import {formatDate} from '@/filters'

  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        loading: false
      }
    },
    methods: {
      getData() {
        this.loading = true
        Api.getOrderTableData({}).then((res) => {
          const {list, total, pageSize} = res.data.dataMap
          this.tableData = list
          this.total = total
          this.pageSize = pageSize
          this.loading = false
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
