<template>
  <div>
    <el-table
      :data="tableData"
      ref="table"
      border
      class="wp100">
      <el-table-column
        prop="contractNo"
        label="合同号">
      </el-table-column>
      <el-table-column
        prop="purchaseOrderNo"
        label="采购订单">
        <template slot-scope="scope">
          <router-link class="router-link" :to="see(scope.row)" target="_blank">
            {{scope.row.purchaseOrderNo}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="taxIncludedAmount"
        label="含税总金额">
      </el-table-column>
      <el-table-column
        prop="initiateTime"
        label="发起时间"
        width="120">
        <template slot-scope="scope">
          {{scope.row.initiateTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="下单时间"
        width="150">
        <template slot-scope="scope">
          {{scope.row.orderTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt20 mb20 fr"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import Api from '../../../api/manageContract/index'
  import {formatDate} from '../../../filters/moment'
  import comLoading from '../../../mixins/comLoading'
  import {routerNames} from '../../../core/consts'

  export default {
    props: ['contractNo'],
    mixins: [comLoading],
    data () {
      return {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        tableData: []
      }
    },
    watch: {
      contractNo () {
        this.getData()
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        if (!this.contractNo) {
          return
        }
        this.comLoading({
          target: this.$refs.table.$el
        })
        Api.getOrderTableData({contractNo: this.contractNo, pageNo: this.pageNo, pageSize: this.pageSize})
          .then((res) => {
            const data = res.data.dataMap
            if (data) {
              this.tableData = data.data
              this.total = data.total
            }
          })
          .finally(() => {
            this.comLoading(false)
          })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.pageNo = val
        this.getData()
      },
      see (row) {
        const id = row.purchaseOrderId
        return {
          name: routerNames.con_purchase_see,
          query: {id}
        }
      }
    },
    filters: {
      formatDate
    }
  }
</script>
