<template>
  <el-form ref="form" :model="cardFinanceInfoForm" :rules="rules" label-width="120px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="是否涉及金额">
          <el-radio-group v-model="cardFinanceInfoForm.moneyInvolved" :disabled="moneyInvolvedDisabled">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-if="cardFinanceInfoForm.moneyInvolved">
        <el-form-item label="是否一次性付款">
          <el-radio-group v-model="cardFinanceInfoForm.oneOffPay" :disabled="oneOffPayDisabled">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="cardFinanceInfoForm.moneyInvolved">
      <el-col :span="8">
        <el-form-item label="合同总金额" prop="totalAmount">
          <el-input :disabled="totalAmountDisabled" v-model.number="cardFinanceInfoForm.totalAmount" placeholder="根据上表累加(含税价)"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="开票类型" prop="invoiceType">
          <el-select class="wp100" v-model="cardFinanceInfoForm.invoiceType" :disabled="financeDisabled" placeholder="请选择开票类型">
            <el-option v-for="item in invoiceTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="币种" prop="currency">
          <el-select class="wp100" v-model="cardFinanceInfoForm.currency" :disabled="financeDisabled" placeholder="请选择币种">
            <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="cardFinanceInfoForm.moneyInvolved&&cardFinanceInfoForm.oneOffPay">
      <el-col :span="8">
        <el-form-item label="付款条件" prop="paymentTimePeriod">
          <el-select v-model="cardFinanceInfoForm.paymentTimePeriod" :disabled="financeDisabled" placeholder="请选择付款条件" class="wp100" @change="emitValid">
            <el-option v-for="item in paymentTimePeriods" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-show="cardFinanceInfoForm.moneyInvolved">
      <el-form-item label="备注" prop="paymentRemark">
        <el-input v-model="cardFinanceInfoForm.paymentRemark" :disabled="disabled" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
        <span class="tip">注：备注内容将会被添加到合同条款中</span>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import bus from '../../core/bus'
  import {payTypes} from '../../core/consts'

  export default {
    name: 'finance-form',
    props: {
      cardFinanceInfoForm: Object,
      baseInfoForm: Object
    },
    data () {
      const payTypeOpts = Object.keys(payTypes).map(key => ({id: +key, name: payTypes[key]}))
      return {
        payTypeOpts,
        currencyOptions: [{
          value: 1, label: 'CNY 人民币'
        }, {
          value: 2, label: 'USD 美元'
        }, {
          value: 3, label: 'HKD 港币'
        }],
        invoiceTypeOptions: [{
          value: 1, label: '增值税专用发票'
        }, {
          value: 2, label: '增值税普通发票'
        }],
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
        rules: {
          totalAmount: [{required: true, message: '请输入合同总金额'}, {type: 'number', message: '合同总金额必须为数字值'}],
          payTime: [{required: true, message: '请输入付款时间'}],
          invoiceType: [{required: true, message: '请选择开票类型'}],
          paymentTimePeriod: [{required: true, message: '请输入付款条件'}]
        }
      }
    },
    computed: {
      ...mapGetters(['backLogFARole']),
      ...mapState(['pageStatus']),
      // 是否涉及金额
      moneyInvolvedDisabled () {
        const {contractType} = this.baseInfoForm
        if ([2, 4].indexOf(contractType) > -1) {
          return true
        } else if (contractType === 3 && !this.baseInfoForm.prFlag) {
          return true
        }
        return [3, 4].indexOf(this.pageStatus) > -1
      },
      // 是否一次性付款
      oneOffPayDisabled () {
        if (this.baseInfoForm.contractType === 3) {
          return true
        }
        return [3, 4].indexOf(this.pageStatus) > -1
      },
      // 合同总金额
      totalAmountDisabled () {
        if (this.baseInfoForm.contractType !== 3) {
          return true
        }
        return [3, 4].indexOf(this.pageStatus) > -1
      },
      // 开票类型，币种，付款条件禁用
      financeDisabled () {
        if ([1, 2].indexOf(this.pageStatus) > -1) {
          return false
        }
        if (this.backLogFARole) {
          return false
        }
        return true
      },
      disabled () {
        return this.pageStatus !== 1
      }
    },
    methods: {
      // 触发顶级校验
      emitValid () {
        bus.$emit('financeInfoValid')
      },
      valid () {
        let flag = true
        this.$refs.form.validate((valid) => {
          flag = valid
        })
        return flag
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
