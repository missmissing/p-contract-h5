<template>
  <div>
    <el-table
      :data="tableData"
      class="wp100">
      <el-table-column
        prop="contractNo"
        label="合同号"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="purchaseOrderNo"
        label="采购订单"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="taxIncludedAmount"
        label="含税总金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="initiateTime"
        label="发起时间"
        min-width="100">
        <template slot-scope="scope">
          {{scope.row.initiateTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="下单时间"
        min-width="100">
        <template slot-scope="scope">
          {{scope.row.orderTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Api from '../../../../api/manageContract';
  import {formatDate} from '../../../../filters/moment';

  export default {
    props: {
      info: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        tableData: [],
        pageNo: 1,
        pageSize: 100
      };
    },
    filters: {
      formatDate
    },
    methods: {
      getData() {
        Api.getOrderTableData({contractNo: this.info.contractNo, pageNo: this.pageNo, pageSize: this.pageSize})
          .then((res) => {
            const data = res.data.dataMap;
            this.tableData = data.data;
          });
      }
    },
    watch: {
      info(val) {
        if (val.contractNo) {
          this.getData();
        }
      }
    },
    created() {
      if (this.info.contractNo) {
        this.getData();
      }
    }
  };
</script>
