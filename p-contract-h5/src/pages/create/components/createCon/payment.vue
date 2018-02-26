<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <el-table v-show="items[0].visible" :show-header="showHeader" :data="items" row-key="type" :expand-row-keys="expandkeys" class="wp100">
    <el-table-column type="expand" v-if="items.length&&items[0].seriousPayments">
      <template slot-scope="scope">
        <div v-if="items.length&&items[0].seriousPayments">
          <el-button size="small" prefix-icon="el-icon-plus" type="primary" @click="handleAddItem(scope.row.type)" class="mb10">
            添加
          </el-button>
          <el-table :data="scope.row.financeMores">
            <el-table-column width="100" prop="name" label="名称">
              <template slot-scope="scope1">{{`${scope.row.type}${scope1.$index + 1}`}}</template>
            </el-table-column>
            <el-table-column prop="paymentAmount" label="付款金额" width="150">
              <template slot-scope="scope1">
                <el-input v-model="scope1.row.paymentAmount" @blur="inputChange(scope1.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="paymentTimePeriod" label="付款条件" width="200">
              <template slot-scope="scope1">
                <el-select v-model="scope1.row.paymentTimePeriod" placeholder="请选择付款条件">
                  <el-option v-for="item in paymentTimePeriods" :key="item.id" :value="item.id" :label="item.name">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="付款节点说明">
              <template slot-scope="scope1">
                <el-input type="textarea" :rows="2" v-model="scope1.row.remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="ratio" label="占比" width="100">
              <template slot-scope="scope1">
                {{calcPercent(scope1.row, scope1.row.paymentAmount)}}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope1">
                <el-button @click="handleRemove(scope1.$index, scope.row.financeMores)" type="danger" size="small">移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width="100"></el-table-column>
    <el-table-column prop="seriousPayments" label="多次付款" width="130">
      <template slot-scope="scope">
        <el-checkbox :disabled="payTimesDisabled" :checked="scope.row.seriousPayments" @change="handleSeriousPaymentsChange(scope.row)"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column prop="paymentAmount" label="付款金额" width="150">
      <template slot-scope="scope">
        <el-input v-if="!scope.row.seriousPayments" v-model="scope.row.paymentAmount" @blur="inputChange(scope.row)"></el-input>
        <template v-else>{{totalPaymentAmount}}</template>
      </template>
    </el-table-column>
    <el-table-column prop="paymentTimePeriod" label="付款条件" width="200px">
      <template slot-scope="scope">
        <el-select :disabled="scope.row.seriousPayments" v-model="scope.row.paymentTimePeriod" placeholder="请选择付款条件">
          <el-option v-for="item in paymentTimePeriods" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="付款节点说明">
      <template slot-scope="scope">
        <el-input :disabled="scope.row.seriousPayments" type="textarea" :rows="2" v-model="scope.row.remark"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="ratio" label="占比" width="100">
      <template slot-scope="scope">
        {{calcPercent(scope.row, scope.row.paymentAmount)}}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="danger" size="small" @click="remove">移除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {nonNegative} from '../../../../util/reg'

  export default {
    props: {
      showHeader: Boolean,
      items: Array,
      totalAmount: Number
    },
    data () {
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
        }],
        expandkeys: []
      }
    },
    computed: {
      totalPaymentAmount () {
        let total = 0
        if (this.items.length) {
          this.items[0].financeMores.forEach((item) => {
            if (item.paymentAmount) {
              total += Number(item.paymentAmount, 10)
            }
          })
          this.items[0].paymentAmount = total
        }
        return total
      },
      payTimesDisabled () {
        const item = this.items[0]
        const {payType} = item
        if ([1, 5].indexOf(payType) > -1) { // 定金或保证金
          return true
        }
        return false
      }
    },
    methods: {
      inputChange (item) {
        const val = item.paymentAmount
        if (val && !nonNegative(val)) {
          this.$message.warning('请输入数值！')
          this.$nextTick(() => {
            item.paymentAmount = ''
          })
        }
      },
      calcPercent (item, val) {
        let result = 0
        if (val) {
          if (this.totalAmount) {
            result = ((val / this.totalAmount) * 100).toFixed(2)
          }
          item.ratio = result
        }
        return `${result}%`
      },
      handleSeriousPaymentsChange (item) {
        item.seriousPayments = !item.seriousPayments
        item.paymentAmount = null
        item.paymentTimePeriod = null
        item.remark = null
        item.financeMores = []
        this.expandkeys = []
      },
      handleAddItem () {
        const item = {
          paymentTimePeriod: null,
          paymentAmount: '',
          remark: '',
          ratio: ''
        }
        this.items[0].financeMores.push(item)
      },
      handleRemove (index, rows) {
        rows.splice(index, 1)
      },
      remove () {
        Object.assign(this.items[0], {
          visible: false,
          paymentAmount: null,
          paymentTimePeriod: null,
          ratio: null,
          remark: null,
          seriousPayments: null,
          financeMores: []
        })
      }
    }
  }
</script>
