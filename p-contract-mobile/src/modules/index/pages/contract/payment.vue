<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <el-table :show-header="showHeader" :data="items" class="wp100">
    <el-table-column type="expand" v-if="items.length&&items[0].seriousPayments">
      <template slot-scope="scope">
        <div v-if="items.length&&items[0].seriousPayments">
          <el-table :data="scope.row.financeMores">
            <el-table-column width="100" prop="name" label="名称">
              <template slot-scope="scope1">{{`${scope.row.type}${scope1.$index + 1}`}}</template>
            </el-table-column>
            <el-table-column prop="paymentAmount" label="付款金额" width="150"></el-table-column>
            <el-table-column prop="paymentTimePeriod" label="付款条件" width="200">
              <template slot-scope="scope1">
                <el-select v-model="scope1.row.paymentTimePeriod" :disabled="disabled" placeholder="请选择付款条件">
                  <el-option v-for="item in paymentTimePeriods" :key="item.id" :value="item.id" :label="item.name">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="付款节点说明">
              <template slot-scope="scope1">
                <el-input type="textarea" :rows="2" :disabled="disabled" v-model="scope1.row.remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="ratio" label="占比" width="100">
              <template slot-scope="scope1">
                {{calcPercent(scope1.row, scope1.row.paymentAmount)}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width="100"></el-table-column>
    <el-table-column prop="seriousPayments" label="多次付款" width="130">
      <template slot-scope="scope">
        <el-checkbox :disabled="true" :checked="scope.row.seriousPayments"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column prop="paymentAmount" label="付款金额" width="150">
      <template slot-scope="scope">
        <template v-if="!scope.row.seriousPayments">{{scope.row.paymentAmount}}</template>
        <template v-else>{{totalPaymentAmount}}</template>
      </template>
    </el-table-column>
    <el-table-column prop="paymentTimePeriod" label="付款条件" width="200px">
      <template slot-scope="scope">
        {{scope.row.paymentTimePeriod | paymentTimePeriods}}
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="付款节点说明"></el-table-column>
    <el-table-column prop="ratio" label="占比" width="100">
      <template slot-scope="scope">
        {{calcPercent(scope.row, scope.row.paymentAmount)}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import paymentTimePeriods from '../../../../filters/paymentTimePeriods';

  import numCalc from '../../../../util/numCalc'

  export default {
    props: {
      showHeader: Boolean,
      items: Array,
      totalAmount: Number
    },
    data() {
      return {
        paymentTimePeriods: [{
          id: 'Z015', name: '到票日后15天付款'
        }, {
          id: 'Z020', name: '到票日后20天付款'
        }, {
          id: 'Z025', name: '到票日后25天付款'
        }, {
          id: 'Z030', name: '到票日后30天付款'
        }, {
          id: 'Z035', name: '到票日后35天付款'
        }, {
          id: 'Z040', name: '到票日后40天付款'
        }, {
          id: 'Z045', name: '到票日后45天付款'
        }, {
          id: 'Z000', name: '立即付款'
        }]
      }
    },
    computed: {
      totalPaymentAmount() {
        let total = 0;
        if (this.items.length) {
          this.items[0].financeMores.forEach((item) => {
            if (item.paymentAmount) {
              total = numCalc.add(total, item.paymentAmount)
            }
          });
          this.items[0].paymentAmount = total
        }
        return total
      }
    },
    methods: {
      calcPercent(item, val) {
        let result = 0;
        if (val) {
          if (this.totalAmount) {
            result = ((val / this.totalAmount) * 100).toFixed(2)
          }
          item.ratio = result
        }
        return `${result}%`
      }
    },
    filters: {
      paymentTimePeriods
    }
  }
</script>
