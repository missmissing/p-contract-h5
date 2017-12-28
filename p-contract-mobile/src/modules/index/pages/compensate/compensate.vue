<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <Header title="违约赔付查看"></Header>
    <div class="container">
      <mt-cell title="合同编号" :value="basicForm.contractNo"></mt-cell>
      <mt-cell title="合同签署日期" :value="signTime | formatDate"></mt-cell>
      <mt-cell title="合同生效日期" :value="startTime | formatDate"></mt-cell>
      <mt-cell title="合同终止日期" :value="endTime | formatDate"></mt-cell>
      <mt-cell title="业务经办人" :value="businessOperator"></mt-cell>
      <mt-cell title="所属部门" :value="businessDept"></mt-cell>
      <mt-cell title="违约方" :value="defaulter | defaultParty"></mt-cell>
      <mt-cell title="涉及赔付" :value="compensateStatus | yesOrNo"></mt-cell>
      <mt-cell title="赔付类型" :value="compensateType | sateType"></mt-cell>
      <mt-cell title="赔付金额" :value="compensateMoney"></mt-cell>
      <mt-navbar v-model="selected" class="mb20">
        <mt-tab-item :id="1">审批意见</mt-tab-item>
        <mt-tab-item :id="2">处理结论</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="1">
          <Comments></Comments>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
          <mt-cell title="选择" :value="handleForm.schemeType | handleResult"></mt-cell>
          <mt-cell title="违约/赔付原因" :value="handleForm.violateReason"></mt-cell>
          <mt-cell title="处理方案" t :value="handleForm.treatmentScheme"></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <ActionSumit></ActionSumit>
  </div>
</template>

<script>
  import Api from '../../../../api/performance/index';
  import Header from '../../components/header.vue';
  import ActionSumit from '../../components/actionSubmit.vue';
  import Comments from '../../components/comments.vue';
  import {formatDate} from '../../../../filters/moment';
  import defaultParty from '../../../../filters/defaultParty';
  import sateType from '../../../../filters/compensateType';
  import yesOrNo from '../../../../filters/yesOrNo';
  import handleResult from '../../../../filters/handleResult';
  import routerNames from '../../router/consts';

  export default {
    data() {
      return {
        procTitle: '',
        procInstId: '',
        selected: 1,
        signTime: '',
        startTime: '',
        endTime: '',
        businessOperator: '',
        businessDept: '',
        defaulter: null,
        compensateStatus: false,
        compensateType: null,
        compensateMoney: '',
        fileList: [],
        toDetail: {name: routerNames.con_Check, query: {contractId: ''}},
        basicForm: {
          contractNo: ''
        },
        handleForm: {
          schemeType: null,
          violateReason: '',
          treatmentScheme: ''
        }
      };
    },
    methods: {
      getInfo() {
        const id = this.$store.state.id;
        Api.getViolateByProcInstId({procInstId: id}).then((res) => {
          const data = res.data.dataMap;
          console.log(data);
          this.setData(data);
        });
      },
      setData(data) {
        const {contractBasic, violateDispose} = data;
        const {
          startTime, endTime, businessOperator, businessDept, signTime, contractNo
        } = contractBasic;
        const {
          files, schemeType, defaulter, compensateType, compensateStatus, compensateMoney, treatmentScheme, violateReason
        } = violateDispose;
        this.basicForm.contractNo = contractNo;
        this.fileList = files || [];
        this.startTime = startTime;
        this.endTime = endTime;
        this.signTime = signTime;
        this.businessDept = businessDept;
        this.businessOperator = businessOperator;
        this.defaulter = defaulter;
        this.compensateType = compensateType;
        this.compensateStatus = compensateStatus;
        this.compensateMoney = compensateMoney;
        Object.assign(this.handleForm, {
          schemeType,
          violateReason,
          treatmentScheme
        });
        this.toDetail.query.contractNo = contractNo;
      }
    },
    created() {
      this.getInfo();
    },
    filters: {
      formatDate,
      defaultParty,
      yesOrNo,
      sateType,
      handleResult
    },
    components: {
      Header,
      ActionSumit,
      Comments
    }
  };
</script>
