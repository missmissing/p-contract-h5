<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-cell title="涉及金额" :value="info.moneyInvolved | yesOrNo"></mt-cell>
    <div v-if="info.moneyInvolved">
      <mt-cell title="一次性付款" :value="info.oneOffPay | yesOrNo"></mt-cell>
      <mt-cell title="合同总金额" :value="info.totalAmount"></mt-cell>
      <mt-cell title="开票类型" :value="info.invoiceType"></mt-cell>
      <mt-cell title="币种" :value="info.currency"></mt-cell>
      <mt-cell title="付款条件" :value="info.paymentTimePeriod" v-if="info.oneOffPay"></mt-cell>
    </div>
    <div v-if="!info.oneOffPay">
      <div v-if="info.paymentMethods">
        <Payment :items="info.paymentMethods.earnest" :datas="moreDatas" :show-header="true" class="wp100"></Payment>
        <Payment :items="info.paymentMethods.advance" :datas="moreDatas" class="wp100"></Payment>
        <Payment :items="info.paymentMethods.progress" :datas="moreDatas" class="wp100"></Payment>
        <Payment :items="info.paymentMethods._final" :datas="moreDatas" class="wp100"></Payment>
        <Payment :items="info.paymentMethods.deposit" :datas="moreDatas" class="wp100"></Payment>
      </div>
    </div>
    <div class="title">开票信息</div>
    <BothInfo
      :jiaBillingInfo="info.jiaBillingInfo"
      :yiBillingInfo="info.yiBillingInfo"
    ></BothInfo>
  </div>
</template>

<script>
  import Payment from './payment.vue';
  import BothInfo from './bothInfo.vue';
  import yesOrNo from '../../../filters/yesOrNo';

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
    computed: {
      moreDatas() {
        return {
          totalAmount: this.info.totalAmount
        };
      }
    },
    filters: {
      yesOrNo
    },
    components: {
      Payment,
      BothInfo
    }
  };
</script>
