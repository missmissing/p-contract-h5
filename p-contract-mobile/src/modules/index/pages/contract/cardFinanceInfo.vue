<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-cell title="涉及金额" :value="info.moneyInvolved | yesOrNo"></mt-cell>
    <div v-if="info.moneyInvolved">
      <mt-cell title="一次性付款" :value="info.oneOffPay | yesOrNo"></mt-cell>
      <mt-cell title="合同总金额" :value="info.totalAmount"></mt-cell>
      <mt-cell title="开票类型" :value="info.invoiceType | invoiceType"></mt-cell>
      <mt-cell title="币种" :value="info.currency | currency"></mt-cell>
      <mt-cell title="付款条件" :value="info.paymentTimePeriod | paymentTimePeriods" v-if="info.oneOffPay"></mt-cell>
    </div>
    <div v-if="!info.oneOffPay">
      <template v-for="(item,index) in paymentMethods">
        <Payment :items="[item]" :totalAmount="info.totalAmount" :show-header="index===0"></Payment>
      </template>
    </div>
    <div class="title mt20">开票信息</div>
    <BothInfo :jiaBillingInfo="info.jiaBillingInfo" :yiBillingInfo="info.yiBillingInfo"></BothInfo>
  </div>
</template>

<script>
  import Payment from './payment.vue'
  import BothInfo from './bothInfo.vue'
  import yesOrNo from '../../../../filters/yesOrNo'
  import invoiceType from '../../../../filters/invoiceType'
  import currency from '../../../../filters/currency'
  import paymentTimePeriods from '../../../../filters/paymentTimePeriods'

  export default {
    props: {
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        paymentMethods: []
      }
    },
    watch: {
      info (val) {
        const {paymentMethods} = val
        const items = paymentMethods.map((item) => {
          const {payType} = item
          switch (payType) {
            case 1:
              item.type = '定金'
              break
            case 2:
              item.type = '预付款'
              break
            case 3:
              item.type = '进度款'
              break
            case 4:
              item.type = '尾款'
              break
            case 5:
              item.type = '保证金'
              break
          }
          return item
        })
        this.paymentMethods = items
      }
    },
    filters: {
      yesOrNo,
      invoiceType,
      currency,
      paymentTimePeriods
    },
    components: {
      Payment,
      BothInfo
    }
  }
</script>
