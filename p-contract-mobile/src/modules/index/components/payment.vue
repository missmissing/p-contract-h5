<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <el-table :show-header="showHeader" :data="items" class="wp100">
    <el-table-column type="expand" v-if="items.length&&items[0].seriousPayments">
      <template scope="scope">
        <div v-if="items.length&&items[0].seriousPayments">
          <el-table :data="scope.row.subItem">
            <el-table-column width="100px" prop="name" label="名称">
              <template scope="scope1">{{`${scope.row.type}${scope1.$index + 1}`}}</template>
            </el-table-column>
            <el-table-column
              prop="paymentAmount"
              label="付款金额">
            </el-table-column>
            <el-table-column
              prop="paymentTimePeriod"
              label="付款条件"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="付款节点说明"
              width="200px">
            </el-table-column>
            <el-table-column prop="ratio" label="占比" width="100px">
              <template scope="scope1">
                {{calcPercent(scope1.row, scope1.row.paymentAmount)}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width="100px"></el-table-column>
    <el-table-column prop="seriousPayments" label="多次付款" width="130px">
      <template scope="scope">
        <el-checkbox
          :disabled="true"
          :checked="scope.row.seriousPayments"
        ></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column prop="paymentAmount" label="付款金额" width="150px">
      <template scope="scope">
        <template v-if="!scope.row.seriousPayments">{{scope.row.paymentAmount}}</template>
        <template v-else>{{totalPaymentAmount}}</template>
      </template>
    </el-table-column>
    <el-table-column
      prop="paymentTimePeriod"
      label="付款条件"
      width="200px">
      <template scope="scope">
        {{scope.row.paymentTimePeriod | paymentTimePeriods}}
      </template>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="付款节点说明">
    </el-table-column>
    <el-table-column prop="ratio" label="占比" width="100px">
      <template scope="scope">
        {{calcPercent(scope.row, scope.row.paymentAmount)}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {nonNegative} from '../../../util/reg';
  import paymentTimePeriods from '../../../filters/paymentTimePeriods';

  export default {
    props: {
      showHeader: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default() {
          return [];
        }
      },
      datas: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      totalPaymentAmount() {
        let total = 0;
        if (this.items.length) {
          this.items[0].subItem.forEach((item) => {
            if (item.paymentAmount) {
              total += Number(item.paymentAmount, 10);
            }
          });
        }
        return total;
      }
    },
    methods: {
      ifFind(columns, column) {
        return columns.indexOf(column) > -1;
      },
      calcPercent(item, val) {
        let result = 0;
        if (val) {
          if (this.datas.totalAmount) {
            result = ((val / this.datas.totalAmount) * 100).toFixed(2);
          }
          item.ratio = result;
        }
        return `${result}%`;
      }
    },
    filters: {
      paymentTimePeriods
    }
  };
</script>
