<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <Header title="从协议查看"></Header>
    <div class="container">
      <mt-cell title="从协议编号" :value="protocolNo" v-if="protocolNo"></mt-cell>
      <mt-cell title="关联合同编号" :value="code"></mt-cell>
      <div>
        <div class="title">合同供应商信息</div>
        <el-table :data="baseInfoForm.tableSupplierInfo">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="code" label="供应商编号" min-width="130"></el-table-column>
          <el-table-column prop="name" label="供应商名称" min-width="250"></el-table-column>
        </el-table>
      </div>
      <div class="mt20">
        <div class="title">我方主体名称</div>
        <el-table :data="baseInfoForm.conSubjctName">
          <el-table-column prop="code" label="公司代码" min-width="100"></el-table-column>
          <el-table-column prop="name" label="公司名称" min-width="250"></el-table-column>
        </el-table>
        <mt-cell title="盖章次序" :value="baseInfoForm.radioSealOrder | printOpts"></mt-cell>
        <mt-cell :value="baseInfoForm.sealReason" v-if="baseInfoForm.radioSealOrder==0"></mt-cell>
      </div>
      <mt-navbar v-model="selected" class="mt20 mb20">
        <mt-tab-item :id="1">审批意见</mt-tab-item>
        <mt-tab-item :id="3">合同附件及盖章信息</mt-tab-item>
        <mt-tab-item :id="4">补充信息</mt-tab-item>
        <mt-tab-item :id="5" v-if="cardRelatedInfoForm.contractList.length">相关数据</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="1">
          <Comments></Comments>
        </mt-tab-container-item>
        <mt-tab-container-item :id="3">
          <template v-if="cardSealInfoForm.sealAttachments&&cardSealInfoForm.sealAttachments.length"
                    v-for="(item,index) in cardSealInfoForm.sealAttachments">
            <SealTable :items="item" :show-header="index===0" v-if="item&&item.length"></SealTable>
          </template>
        </mt-tab-container-item>
        <mt-tab-container-item :id="4">
          <mt-cell title="备注" :value="cardRemarkInfoForm.otherInstruction"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item :id="5">
          <el-table :data="cardRelatedInfoForm.contractList">
            <el-table-column type="index" label="序号" width="80px"></el-table-column>
            <el-table-column prop="contractCode" label="合同号" min-width="130"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="company" label="公司"></el-table-column>
            <el-table-column prop="startTime" label="开始时间" min-width="130"></el-table-column>
          </el-table>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <ActionSumit></ActionSumit>
  </div>
</template>

<script>
  import Api from '../../../../api/manageContract';
  import printOpts from '../../../../filters/printOpts';
  import Header from '../../components/header.vue';
  import ActionSumit from '../../components/actionSubmit.vue';
  import SealTable from '../../components/sealTable.vue';
  import Comments from '../../components/comments.vue';

  export default {
    data() {
      return {
        selected: 3,
        protocolNo: null, // 从协议编号
        code: null, //合同编号
        baseInfoForm: {
          tableSupplierInfo: [],
          conSubjctName: [],
          radioSealOrder: 1, // 0：我方先盖章 1：对方先盖章
          sealReason: ''
        },
        cardSealInfoForm: {
          sealAttachments: []
        },
        cardRemarkInfoForm: {
          otherInstruction: ''
        },
        cardRelatedInfoForm: {
          contractList: []
        }
      };
    },
    methods: {
      getInfo() {
        const id = this.$store.state.id;
        Api.getAgreenmentDetail(id)
          .then((res) => {
            const data = res.data.dataMap;
            console.log(data);
            const {protocolNo, code, baseInfoForm, cardSealInfoForm, cardRemarkInfoForm, cardRelatedInfoForm} = data;
            this.protocolNo = protocolNo;
            this.code = code;
            this.baseInfoForm = baseInfoForm;
            this.cardSealInfoForm = cardSealInfoForm;
            this.cardRemarkInfoForm = cardRemarkInfoForm;
            if (cardRelatedInfoForm) {
              this.cardRelatedInfoForm = cardRelatedInfoForm;
            }
          });
      },
    },
    created() {
      const processData = this.$store.state.processData;
      if (!Object.keys(processData).length) {
        return;
      }
      this.getInfo();
    },
    filters: {
      printOpts
    },
    components: {
      Header,
      SealTable,
      ActionSumit,
      Comments
    }
  };
</script>
