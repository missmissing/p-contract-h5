<template>
  <div>
    <FinaceForm :cardFinanceInfoForm="cardFinanceInfoForm" :baseInfoForm="baseInfoForm" :disabled="disabled" ref="form"></FinaceForm>
    <el-card v-show="cardFinanceInfoForm.moneyInvolved&&!cardFinanceInfoForm.oneOffPay" class="mb20">
      <header slot="header">付款方式<i class="tip ml20">{{paymentErrorMSG}}</i></header>
      <div>
        <el-dropdown :disabled="disabled" @command="selectPayType" class="mb20">
          <span class="router-link">付款类型<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <template v-for="item in payTypeOpts">
              <el-dropdown-item :command="item.id">{{item.name}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
        <template v-for="(item,index) in cardFinanceInfoForm.paymentMethods">
          <Payment :items="[item]" :totalAmount="cardFinanceInfoForm.totalAmount" :show-header="index===0" :disabled="disabled"></Payment>
        </template>
      </div>
    </el-card>
    <el-card header="开票信息" class="mt20">
      <BothInfo :jiaBillingInfo="cardFinanceInfoForm.jiaBillingInfo" :yiBillingInfo="cardFinanceInfoForm.yiBillingInfo"></BothInfo>
    </el-card>
  </div>
</template>

<script>
  import {payTypes} from '../../../../core/consts'

  import FinaceForm from './financeForm.vue'
  import Payment from './payment.vue'
  import BothInfo from '../bothInfo.vue'

  export default {
    name: 'finace-info',
    props: {
      disabled: Boolean,
      cardFinanceInfoForm: Object,
      baseInfoForm: Object
    },
    data () {
      const payTypeOpts = Object.keys(payTypes).map(key => ({id: +key, name: payTypes[key]}))
      return {
        payTypeOpts,
        paymentErrorMSG: null
      }
    },
    computed: {
      // 计算分批付款金额之和
      totalConMoney () {
        const {oneOffPay, totalAmount, paymentMethods} = this.cardFinanceInfoForm
        if (oneOffPay) {
          return totalAmount
        }
        let m = 0
        paymentMethods.forEach((item) => {
          const {paymentAmount} = item
          if (paymentAmount) {
            m += parseFloat(paymentAmount)
          }
        })
        return m
      }
    },
    watch: {
      totalConMoney (val) {
        if (val !== this.cardFinanceInfoForm.totalAmount) {
          this.paymentErrorMSG = '您添加的付款金额必须等于合同总金额'
        } else {
          this.paymentErrorMSG = null
        }
      }
    },
    methods: {
      // 选择付款类型
      selectPayType (val) {
        this.cardFinanceInfoForm.paymentMethods.some((item) => {
          if (item.payType === val) {
            item.visible = true
            return true
          }
          return false
        })
      },
      // 判断多次付款，付款条件是否选择
      checkPayCondition () {
        return this.cardFinanceInfoForm.paymentMethods.some((item) => {
          const {financeMores, seriousPayments, paymentAmount} = item
          if (seriousPayments) {
            if (financeMores.length) {
              return this.checkPayCondition(financeMores)
            }
            return false
          }
          if (paymentAmount) {
            return !item.paymentTimePeriod
          }
          return false
        })
      },
      valid () {
        let errorCount = 0
        const form = this.cardFinanceInfoForm
        if (!this.$refs.form.valid()) {
          errorCount++
        }

        const {moneyInvolved, oneOffPay, totalAmount} = this.cardFinanceInfoForm
        if (moneyInvolved) {
          if (!oneOffPay) {
            if (this.totalConMoney !== totalAmount) {
              errorCount++
            }
            if (this.checkPayCondition()) { // 判断付款条件是否选择
              errorCount++
            }
          }
        }
        form.errorCount = errorCount
        return !errorCount
      }
    },
    components: {
      FinaceForm,
      BothInfo,
      Payment
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
