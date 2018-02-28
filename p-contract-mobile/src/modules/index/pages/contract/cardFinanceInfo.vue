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
      <div v-if="info.paymentMethods">
        <Payment v-if="info.paymentMethods.earnest" :items="info.paymentMethods.earnest" :totalAmount="info.totalAmount"
                 :show-header="true"
                 class="wp100"></Payment>
        <Payment v-if="info.paymentMethods.advance" :items="info.paymentMethods.advance" :totalAmount="info.totalAmount"
                 class="wp100"></Payment>
        <Payment v-if="info.paymentMethods.progress" :items="info.paymentMethods.progress"
                 :totalAmount="info.totalAmount" class="wp100"></Payment>
        <Payment v-if="info.paymentMethods._final" :items="info.paymentMethods._final" :totalAmount="info.totalAmount"
                 class="wp100"></Payment>
        <Payment v-if="info.paymentMethods.deposit" :items="info.paymentMethods.deposit" :totalAmount="info.totalAmount"
                 class="wp100"></Payment>
      </div>
    </div>
    <div class="title mt20">开票信息</div>
    <BothInfo :jiaBillingInfo="info.jiaBillingInfo" :yiBillingInfo="info.yiBillingInfo"></BothInfo>
  </div>
</template>

<script>
  import Payment from '../../components/payment.vue';
  import BothInfo from './bothInfo.vue';
  import yesOrNo from '../../../../filters/yesOrNo';
  import invoiceType from '../../../../filters/invoiceType';
  import currency from '../../../../filters/currency';
  import paymentTimePeriods from '../../../../filters/paymentTimePeriods';

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
      return {};
    },
    watch: {
      info(val) {
        const {paymentMethods} = val;
        if (paymentMethods) {
          const {earnest, advance, progress, _final, deposit} = paymentMethods;
          if (earnest && earnest.length) {
            earnest[0].type = '定金';
          }
          if (advance && advance.length) {
            advance[0].type = '预付款';
          }
          if (progress && progress.length) {
            progress[0].type = '进度款';
          }
          if (_final && _final.length) {
            _final[0].type = '尾款';
          }
          if (deposit && deposit.length) {
            deposit[0].type = '保证金';
          }
        }
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
  };
</script>
