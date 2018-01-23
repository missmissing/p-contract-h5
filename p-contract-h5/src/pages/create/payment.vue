<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <el-table :show-header="showHeader" :data="items" row-key="type" :expand-row-keys="expandkeys" class="wp100">
    <el-table-column type="expand" v-if="items.length&&items[0].seriousPayments">
      <template scope="scope">
        <div class="pt20 pb20" v-if="items.length&&items[0].seriousPayments">
          <el-button
            v-if="!disabledTable"
            size="small"
            icon="plus"
            type="primary"
            @click="handleAddItem(scope.row.type)"
            class="mb10">
            添加
          </el-button>
          <el-table :data="scope.row.subItem">
            <el-table-column width="100px" prop="name" label="名称">
              <template scope="scope1">{{`${scope.row.type}${scope1.$index + 1}`}}</template>
            </el-table-column>
            <el-table-column
              prop="paymentAmount"
              label="付款金额">
              <template scope="scope1">
                <el-input
                  :disabled="disabledTable"
                  v-model="scope1.row.paymentAmount"
                  @blur="inputChange(scope1.row,$event)"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="paymentTimePeriod"
              label="付款条件"
              width="200px">
              <template scope="scope1">
                <el-select
                  :disabled="disabledTable"
                  v-model="scope1.row.paymentTimePeriod"
                  placeholder="请选择付款条件"
                >
                  <el-option
                    v-for="item in moreDatas.paymentTimePeriods"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="付款节点说明"
              width="200px">
              <template scope="scope1">
                <el-input
                  :disabled="disabledTable"
                  type="textarea"
                  :rows="2"
                  v-model="scope1.row.remark"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="ratio" label="占比" width="100px">
              <template scope="scope1">
                {{calcPercent(scope1.row, scope1.row.paymentAmount)}}
              </template>
            </el-table-column>
            <el-table-column
              v-if="!disabledTable"
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope1">
                <el-button
                  @click="handleRemove(scope1.$index, scope.row.subItem)"
                  type="danger" size="small">移除
                </el-button>
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
          :disabled="payTimesDisabled"
          :checked="scope.row.seriousPayments"
          @change="handleSeriousPaymentsChange(scope.row,$event)"
        ></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column prop="paymentAmount" label="付款金额" width="150px">
      <template scope="scope">
        <el-input
          v-if="!scope.row.seriousPayments"
          :disabled="disabledTable"
          v-model="scope.row.paymentAmount" @blur="inputChange(scope.row,$event)"></el-input>
        <template v-else>{{totalPaymentAmount}}</template>
      </template>
    </el-table-column>
    <el-table-column
      prop="paymentTimePeriod"
      label="付款条件"
      width="200px">
      <template scope="scope">
        <el-select
          :disabled="disabledTable||scope.row.seriousPayments"
          v-model="scope.row.paymentTimePeriod"
          placeholder="请选择付款条件">
          <el-option
            v-for="item in moreDatas.paymentTimePeriods"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="付款节点说明">
      <template scope="scope">
        <el-input
          :disabled="disabledTable||scope.row.seriousPayments"
          type="textarea"
          :rows="2"
          v-model="scope.row.remark"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="ratio" label="占比" width="100px">
      <template scope="scope">
        {{calcPercent(scope.row, scope.row.paymentAmount)}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {nonNegative} from '../../util/reg';

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
      moreDatas: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        expandkeys: [],
        paymentType: {
          1: '定金',
          2: '预付款',
          3: '进度款',
          4: '尾款',
          5: '保证金'
        }
      };
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
          this.items[0].paymentAmount = total;
        }
        return total;
      },
      disabledTable() {
        const {isSee, backLogFA} = this.moreDatas;
        if (backLogFA) {
          return false;
        }
        if (isSee) {
          return true;
        }
        return false;
      },
      payTimesDisabled() {
        const item = this.items[0];
        const {type} = item;
        if ([this.paymentType[1], this.paymentType[5]].indexOf(type) > -1) {
          return true;
        } else if (this.disabledTable) {
          return true;
        }
        return false;
      }
    },
    methods: {
      inputChange(item, event) {
        const val = event.target.value;
        if (val && !nonNegative(val)) {
          this.$message.warning('请输入数值！');
          this.$nextTick(() => {
            item.paymentAmount = '';
          });
          return;
        }
        item.paymentAmount = val;
      },
      calcPercent(item, val) {
        let result = 0;
        if (val) {
          if (this.moreDatas.totalAmount) {
            result = ((val / this.moreDatas.totalAmount) * 100).toFixed(2);
          }
          item.ratio = result;
        }
        return `${result}%`;
      },
      handleSeriousPaymentsChange(item, event) {
        item.seriousPayments = event.target.checked;
        item.paymentAmount = null;
        item.paymentTimePeriod = null;
        item.remark = null;
        item.subItem = [];
        this.expandkeys = [];
      },
      handleAddItem() {
        const item = {
          paymentTimePeriod: null,
          paymentAmount: '',
          remark: '',
          ratio: ''
        };
        this.items[0].subItem.push(item);
      },
      handleRemove(index, rows) {
        rows.splice(index, 1);
      }
    }
  };
</script>
