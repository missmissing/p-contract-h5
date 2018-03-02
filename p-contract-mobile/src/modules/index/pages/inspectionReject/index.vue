<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="main">
    <div class="container">
      <mt-cell title="采购订单号" :value="orderNo"></mt-cell>
      <mt-cell title="业务经办人" :value="basicForm.businessOperatorName"></mt-cell>
      <mt-cell title="业务部门" :value="basicForm.businessDeptName"></mt-cell>
      <mt-cell title="合同编号" :value="basicForm.contractNo"></mt-cell>
      <mt-cell title="合同模式" :value="basicForm.contractType"></mt-cell>
      <mt-cell title="合同类型" :value="basicForm.contractTextType"></mt-cell>
      <mt-cell title="所属项目" :value="basicForm.belongProject"></mt-cell>
      <mt-cell title="验收责任人" :value="basicForm.responsibleName"></mt-cell>
      <mt-cell title="合同生效日期" :value="basicForm.startTime | formatDate"></mt-cell>
      <mt-cell title="合同验收日期" :value="contractCheckDate | formatDate"></mt-cell>
      <mt-navbar v-model="selected" class="mt20 mb20">
        <mt-tab-item :id="0">审批意见</mt-tab-item>
        <mt-tab-item :id="1">验收信息</mt-tab-item>
        <mt-tab-item :id="2">处理结论</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="0">
          <Comments></Comments>
        </mt-tab-container-item>
        <mt-tab-container-item :id="1">
          <el-table :data="checkItems" border class="wp100">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="serviceName" label="验收要素" min-width="130"></el-table-column>
            <el-table-column prop="serviceRequire" label="参考标准" min-width="130"></el-table-column>
            <el-table-column prop="checkResult" label="检查结果" min-width="130"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
          <mt-cell title="选择" :value="schemeType | handleResult"></mt-cell>
          <mt-cell title="不合格原因" :value="unqualifiedReason"></mt-cell>
          <mt-cell title="处理方案" :value="treatmentScheme"></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <ActionSumit></ActionSumit>
  </div>
</template>

<script>
  import Api from '../../../../api/performance/index';
  import ActionSumit from '../../components/actionSubmit.vue';
  import Comments from '../../components/comments.vue';
  import {contractTextTypeMap, contractPatternMap} from '../../../../core/consts';
  import routerNames from '../../router/consts';
  import handleResult from '../../../../filters/handleResult';
  import {formatDate} from '../../../../filters/moment';

  export default {
    data() {
      return {
        procTitle: '',
        procInstId: '',
        selected: 0,
        orderNo: '',
        basicForm: {
          businessOperatorName: '',
          businessDeptName: '',
          contractTextType: '',
          responsibleName: '',
          belongProject: '',
          startTime: '',
          endTime: '',
          contractType: '',
          contractNo: ''
        },
        contractCheckDate: '',
        checkItems: [],
        orderId: '',
        schemeType: 1,
        unqualifiedReason: '',
        treatmentScheme: '',
        fileList: [],
        toDetail: {name: routerNames.con_Check, query: {id: ''}}
      };
    },
    methods: {
      getInfo() {
        const procInstId = this.$store.state.id;
        Api.getUnqualifiedByProcInstId({procInstId}).then((res) => {
          const data = res.data.dataMap;
          this.setData(data);
        });
      },
      setData(data) {
        const {unqualifiedBasic, contUnqualified} = data;
        const {
          businessOperatorName, businessDeptName, responsibleName, belongProject, startTime, endTime, contractTextType, contractType, contractNo
        } = unqualifiedBasic;
        const {
          orderNo, contractCheckDate, checkItems, unqualifiedReason, treatmentScheme, schemeType, files
        } = contUnqualified;
        this.basicForm = Object.assign({}, this.basicForm, {
          businessOperatorName,
          businessDeptName,
          responsibleName,
          belongProject,
          startTime,
          endTime,
          contractTextType: contractTextTypeMap[contractTextType],
          contractType: contractPatternMap[contractType],
          contractNo
        });
        this.orderNo = orderNo;
        this.checkItems = checkItems;
        this.contractCheckDate = contractCheckDate;
        this.unqualifiedReason = unqualifiedReason;
        this.treatmentScheme = treatmentScheme;
        this.schemeType = schemeType;
        this.fileList = files || [];
      }
    },
    created() {
      this.getInfo();
    },
    mounted() {
      window._____processCenterPageAction('pageloaded');
    },
    filters: {
      formatDate,
      handleResult
    },
    components: {
      ActionSumit,
      Comments
    }
  };
</script>
