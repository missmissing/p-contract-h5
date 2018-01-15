<style type="text/scss" lang="scss" scoped>
  .navbar {
    margin: 20px 0;
    .mint-tab-item {
      flex: none;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
</style>

<template>
  <div class="main">
    <div class="container">
      <ContractBaseInfo :info="baseInfoForm"></ContractBaseInfo>
      <mt-navbar v-model="selected" class="navbar">
        <mt-tab-item :id="0">审批意见</mt-tab-item>
        <mt-tab-item :id="1">合同内容信息</mt-tab-item>
        <mt-tab-item :id="2">合同财务信息</mt-tab-item>
        <mt-tab-item :id="3">合同验收与样品信息</mt-tab-item>
        <mt-tab-item :id="4">合同附件及盖章信息</mt-tab-item>
        <mt-tab-item :id="5">备注</mt-tab-item>
        <mt-tab-item :id="6">相关数据</mt-tab-item>
        <mt-tab-item :id="7">其他</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="0">
          <Comments></Comments>
        </mt-tab-container-item>
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
          <mt-cell :value="cardRemarkInfoForm.otherInstruction"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item :id="6">
          <CardRelatedInfo :moreData="{cardContentInfoForm}"></CardRelatedInfo>
        </mt-tab-container-item>
        <mt-tab-container-item :id="7">
          <OtherInfo :info="baseInfoForm"></OtherInfo>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <ActionSumit></ActionSumit>
  </div>
</template>

<script>
  import Api from '../../../../api/manageContract';
  import Header from '../../components/header.vue';
  import ContractBaseInfo from './contractBaseInfo.vue';
  import ContractContentInfo from './contractContentInfo.vue';
  import CardFinanceInfo from './cardFinanceInfo.vue';
  import CardContCheckInfo from './cardContCheckInfo.vue';
  import SealInfo from './sealInfo.vue';
  import CardRelatedInfo from './cardRelatedInfo.vue';
  import OtherInfo from './otherInfo.vue';
  import Comments from '../../components/comments.vue';
  import ActionSumit from '../../components/actionSubmit.vue';
  import commonMixin from '../../mixins';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        selected: 0,
        baseInfoForm: {},
        cardContentInfoForm: {},
        cardFinanceInfoForm: {},
        cardContCheckInfoForm: {},
        cardSealInfoForm: {},
        cardRemarkInfoForm: {}
      };
    },
    methods: {
      getInfo() {
        const params = {
          contractId: this.$store.state.id,
          operate: 'PROCESS'
        };
        Api.getContractDetailByContractId(params).then((res) => {
          const data = res.data.dataMap;
          this.initData(data);
        });
      },
      initData(data) {
        const {baseInfoForm, cardContentInfoForm, cardFinanceInfoForm, cardContCheckInfoForm, cardSealInfoForm} = data;
        this.baseInfoForm = baseInfoForm;
        this.cardContentInfoForm = cardContentInfoForm;
        this.cardFinanceInfoForm = cardFinanceInfoForm;
        this.cardContCheckInfoForm = cardContCheckInfoForm;
        this.cardSealInfoForm = cardSealInfoForm;
      }
    },
    created() {
      this.getInfo();
    },
    mounted() {
      window._____processCenterPageAction('pageloaded');
    },
    components: {
      Header,
      ContractBaseInfo,
      ContractContentInfo,
      CardFinanceInfo,
      CardContCheckInfo,
      SealInfo,
      CardRelatedInfo,
      OtherInfo,
      Comments,
      ActionSumit
    }
  };
</script>
