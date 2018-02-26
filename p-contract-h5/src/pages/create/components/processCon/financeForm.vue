<template>
  <el-form :model="cardFinanceInfoForm" :rules="rules" label-width="120px" ref="form">
    <el-row>
      <el-col :span="8">
        <el-form-item label="是否涉及金额">
          <el-radio-group v-model="cardFinanceInfoForm.moneyInvolved" :disabled="disabled">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-if="cardFinanceInfoForm.moneyInvolved">
        <el-form-item label="是否一次性付款">
          <el-radio-group v-model="cardFinanceInfoForm.oneOffPay" :disabled="disabled">
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
          <el-select class="wp100" v-model="cardFinanceInfoForm.invoiceType" placeholder="请选择开票类型" :disabled="financeDisabled">
            <el-option v-for="item in invoiceTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="币种" prop="currency">
          <el-select class="wp100" v-model="cardFinanceInfoForm.currency" placeholder="请选择币种" :disabled="financeDisabled">
            <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="cardFinanceInfoForm.moneyInvolved&&cardFinanceInfoForm.oneOffPay">
      <el-col :span="8">
        <el-form-item label="付款条件" prop="paymentTimePeriod">
          <el-select :disabled="financeDisabled" v-model="cardFinanceInfoForm.paymentTimePeriod" placeholder="请选择付款条件" class="wp100" @change="emitValid">
            <el-option v-for="item in paymentTimePeriods" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-show="cardFinanceInfoForm.moneyInvolved">
      <el-form-item label="备注" prop="paymentRemark">
        <el-input :disabled="true" v-model="cardFinanceInfoForm.paymentRemark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
        <span class="tip">注：备注内容将会被添加到合同条款中</span>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
  import {mapGetters} from 'vuex'
  import bus from '../../../../core/bus'

  export default {
    name: 'finance-form',
    props: {
      disabled: Boolean,
      cardFinanceInfoForm: Object,
      baseInfoForm: Object
    },
    data () {
      return {
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
      // 合同总金额
      totalAmountDisabled () {
        if (this.baseInfoForm.contractType === 3) {
          return false
        }
        return true
      },
      // 开票类型，币种，付款条件禁用
      financeDisabled () {
        if (this.backLogFARole) {
          return false
        }
        return true
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
