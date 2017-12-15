<style type="text/scss" lang="scss" scoped>
  .mint-navbar {
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .mint-tab-item {
    padding-left: 15px;
    padding-right: 15px;
    white-space: nowrap;
    &.is-selected {
      margin-bottom: 0;
    }
  }
</style>

<template>
  <div>
    <mt-header fixed title="模板查看">
      <mt-button icon="back" slot="left"></mt-button>
    </mt-header>
    <div class="mt40">
      <ContractBaseInfo :info="baseInfoForm"></ContractBaseInfo>
      <mt-navbar v-model="selected">
        <mt-tab-item :id="1">合同内容信息</mt-tab-item>
        <mt-tab-item :id="2">合同财务信息</mt-tab-item>
        <mt-tab-item :id="3">合同验收与样品信息</mt-tab-item>
        <mt-tab-item :id="4">合同附件及盖章信息</mt-tab-item>
        <mt-tab-item :id="5">备注</mt-tab-item>
        <mt-tab-item :id="6">相关数据</mt-tab-item>
        <mt-tab-item :id="7">其他</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="1">
          <ContractContentInfo :info="cardContentInfoForm" :moreData="{baseInfoForm}"></ContractContentInfo>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
          <CardFinanceInfo :info="cardFinanceInfoForm"></CardFinanceInfo>
        </mt-tab-container-item>
        <mt-tab-container-item :id="3">
          <CardContCheckInfo :info="cardContCheckInfoForm" :moreData="{baseInfoForm}"></CardContCheckInfo>
        </mt-tab-container-item>
        <mt-tab-container-item :id="4">
          <SealInfo :info="cardSealInfoForm" :moreData="{baseInfoForm}"></SealInfo>
        </mt-tab-container-item>
        <mt-tab-container-item :id="5">
          <mt-field label="" type="textarea" rows="4" :value="cardRemarkInfoForm.otherInstruction" readonly></mt-field>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import ContractBaseInfo from './contractBaseInfo.vue';
  import ContractContentInfo from './contractContentInfo.vue';
  import CardFinanceInfo from './cardFinanceInfo.vue';
  import CardContCheckInfo from './cardContCheckInfo.vue';
  import SealInfo from './sealInfo.vue';

  export default {
    data() {
      return {
        selected: 1,
        baseInfoForm: {},
        cardContentInfoForm: {},
        cardFinanceInfoForm: {},
        cardContCheckInfoForm: {},
        cardSealInfoForm: {},
        cardRemarkInfoForm: {}
      };
    },
    components: {
      ContractBaseInfo,
      ContractContentInfo,
      CardFinanceInfo,
      CardContCheckInfo,
      SealInfo
    }
  };
</script>
