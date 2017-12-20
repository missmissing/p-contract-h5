<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <div v-if="jiaBillingInfo.length>1">
      <h4>具体开票信息以采购提供为准</h4>
    </div>
    <div v-else>
      <div class="title">甲方增值税专用开票信息：</div>
      <mt-cell title="公司名称" :value="jia.company"></mt-cell>
      <mt-cell title="统一社会信用代码" :value="jia.unifiedSocialCreditCode"></mt-cell>
      <mt-cell title="注册地址" :value="jia.registeredAddress"></mt-cell>
      <mt-cell title="经营地址" :value="jia.businessAddress"></mt-cell>
      <mt-cell title="联系电话" :value="jia.contactNumber"></mt-cell>
      <mt-cell title="银行账号" :value="jia.bankAccount"></mt-cell>
      <mt-cell title="开户行" :value="jia.depositBank"></mt-cell>
      <div class="title">乙方指定甲方汇款的账户为：</div>
      <mt-cell title="乙方" :value="yi.company"></mt-cell>
      <mt-cell title="银行账号" :value="yi.bankAccount"></mt-cell>
      <mt-cell title="开户行" :value="yi.depositBank"></mt-cell>
      <mt-cell title="联系人" :value="yi.contacts"></mt-cell>
      <mt-cell title="注册地址" :value="yi.registeredAddress"></mt-cell>
      <mt-cell title="联系电话" :value="yi.contactNumber"></mt-cell>
      <mt-cell title="E-mail" :value="yi.email"></mt-cell>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      jiaBillingInfo: {
        type: Array,
        default: []
      },
      yiBillingInfo: {
        type: Array,
        default: []
      }
    },
    data() {
      return {};
    },
    computed: {
      jia() {
        const jiaBillingInfo = this.jiaBillingInfo;
        let result = {};
        if (jiaBillingInfo.length) {
          result = jiaBillingInfo[0] || {};
        }
        return result;
      },
      yi() {
        const yiBillingInfo = this.yiBillingInfo;
        let result = {};
        if (yiBillingInfo.length) {
          result = yiBillingInfo[0] || {};
        }
        return result;
      }
    }
  };
</script>
