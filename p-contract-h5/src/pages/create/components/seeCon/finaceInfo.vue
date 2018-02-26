<template>
  <div>
    <FinaceForm :cardFinanceInfoForm="cardFinanceInfoForm" :baseInfoForm="baseInfoForm" :disabled="disabled" ref="form"></FinaceForm>
    <el-card v-show="cardFinanceInfoForm.moneyInvolved&&!cardFinanceInfoForm.oneOffPay" class="mb20">
      <header slot="header">付款方式</header>
      <div>
        <template v-for="(item,index) in cardFinanceInfoForm.paymentMethods">
          <Payment :items="[item]" :totalAmount="cardFinanceInfoForm.totalAmount" :show-header="index===0"></Payment>
        </template>
      </div>
    </el-card>
    <el-card header="开票信息" class="mt20">
      <BothInfo :jiaBillingInfo="cardFinanceInfoForm.jiaBillingInfo" :yiBillingInfo="cardFinanceInfoForm.yiBillingInfo"></BothInfo>
    </el-card>
  </div>
</template>

<script>
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
    components: {
      FinaceForm,
      BothInfo,
      Payment
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
