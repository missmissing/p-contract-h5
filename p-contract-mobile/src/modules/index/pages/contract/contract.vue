<template>
  <div class="main">
    <div class="container">
      <ContractBaseInfo :info="baseInfoForm" :moreData="{datas}"></ContractBaseInfo>
      <mt-navbar v-model="selected" class="mt20 mb20">
        <mt-tab-item :id="0">审批意见</mt-tab-item>
        <mt-tab-item :id="1">合同内容信息</mt-tab-item>
        <mt-tab-item :id="2" v-if="contractLabels.length">自定义标签</mt-tab-item>
        <mt-tab-item :id="3">合同财务信息</mt-tab-item>
        <mt-tab-item :id="4" v-if="ifCheckInfo">合同验收与样品信息</mt-tab-item>
        <mt-tab-item :id="5">合同附件</mt-tab-item>
        <mt-tab-item :id="6">盖章信息</mt-tab-item>
        <mt-tab-item :id="7">备注</mt-tab-item>
        <mt-tab-item :id="8">相关数据</mt-tab-item>
        <mt-tab-item :id="9">其他</mt-tab-item>
      </mt-navbar>
      <div>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item :id="0">
            <Comments></Comments>
          </mt-tab-container-item>
          <mt-tab-container-item :id="1">
            <ContractContentInfo :info="cardContentInfoForm" :moreData="{baseInfoForm}"></ContractContentInfo>
          </mt-tab-container-item>
          <mt-tab-container-item :id="2">
            <CustomLabelInfo :items="contractLabels"></CustomLabelInfo>
          </mt-tab-container-item>
          <mt-tab-container-item :id="3">
            <CardFinanceInfo :info="cardFinanceInfoForm"></CardFinanceInfo>
          </mt-tab-container-item>
          <mt-tab-container-item :id="4">
            <CardContCheckInfo :info="cardContCheckInfoForm" :moreData="{baseInfoForm}"></CardContCheckInfo>
          </mt-tab-container-item>
          <mt-tab-container-item :id="5">
            <SealInfo :info="cardSealInfoForm"></SealInfo>
          </mt-tab-container-item>
          <mt-tab-container-item :id="6">
            <SealFile :items="cardSealInfoForm.sealAttaches"></SealFile>
          </mt-tab-container-item>
          <mt-tab-container-item :id="7">
            <mt-cell :value="cardRemarkInfoForm.otherInstruction"></mt-cell>
          </mt-tab-container-item>
          <mt-tab-container-item :id="8">
            <CardRelatedInfo :moreData="{cardContentInfoForm}"></CardRelatedInfo>
          </mt-tab-container-item>
          <mt-tab-container-item :id="9">
            <OtherInfo :info="baseInfoForm"></OtherInfo>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <ActionSumit></ActionSumit>
  </div>
</template>

<script>
  import Api from '../../../../api/manageContract';
  import Header from '../../components/header.vue';
  import ContractBaseInfo from './contractBaseInfo.vue';
  import ContractContentInfo from './contractContentInfo.vue';
  import CustomLabelInfo from './customLabelInfo.vue';
  import CardFinanceInfo from './cardFinanceInfo.vue';
  import CardContCheckInfo from './cardContCheckInfo.vue';
  import SealInfo from './sealInfo.vue';
  import SealFile from '../../components/sealFile.vue';
  import CardRelatedInfo from './cardRelatedInfo.vue';
  import OtherInfo from './otherInfo.vue';
  import Comments from '../../components/comments.vue';
  import ActionSumit from '../../components/actionSubmit.vue';

  export default {
    data() {
      return {
        selected: 0,
        datas: {},
        baseInfoForm: {},
        cardContentInfoForm: {},
        cardFinanceInfoForm: {},
        cardContCheckInfoForm: {},
        cardSealInfoForm: {},
        cardRemarkInfoForm: {},
        contractLabels: []
      };
    },
    computed: {
      // 当合同模式为单一合同和框架协议合同时,显示合同验收与样品信息
      ifCheckInfo() {
        return [1, 3].indexOf(this.baseInfoForm.contractType) > -1
      }
    },
    methods: {
      getInfo() {
        const params = {
          id: this.$store.state.id,
          operate: 'PROCESS'
        };
        Api.getContractDetailByContractId(params).then((res) => {
          const data = res.data.dataMap;
          this.initData(data);
        });
      },
      initData(data) {
        const {baseInfoForm, cardContentInfoForm, cardFinanceInfoForm, cardContCheckInfoForm, contractAttachAndSeal} = data;
        this.datas = data;
        this.baseInfoForm = baseInfoForm;
        this.cardContentInfoForm = cardContentInfoForm;
        this.cardFinanceInfoForm = cardFinanceInfoForm;
        this.cardContCheckInfoForm = cardContCheckInfoForm;
        this.cardSealInfoForm = contractAttachAndSeal;
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
      CustomLabelInfo,
      CardFinanceInfo,
      CardContCheckInfo,
      SealInfo,
      SealFile,
      CardRelatedInfo,
      OtherInfo,
      Comments,
      ActionSumit
    }
  };
</script>
