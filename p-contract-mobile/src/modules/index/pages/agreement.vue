<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <div>
      <mt-cell title="从协议编号" :value="protocolNo"></mt-cell>
      <mt-cell title="关联合同编号" :value="code"></mt-cell>
    </div>
    <div>
      <div class="title">合同供应商信息</div>
      <el-table :data="baseInfoForm.tableSupplierInfo">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="code" label="供应商编号" min-width="130"></el-table-column>
        <el-table-column prop="name" label="供应商名称" min-width="130"></el-table-column>
      </el-table>
    </div>
    <div>
      <div class="title">我方主体名称</div>
      <el-table :data="baseInfoForm.conSubjctName">
        <el-table-column prop="code" label="公司代码"></el-table-column>
        <el-table-column prop="name" label="公司名称"></el-table-column>
      </el-table>
      <mt-cell title="盖章次序" :value="baseInfoForm.radioSealOrder | printOpts"></mt-cell>
      <mt-field label="" type="textarea" rows="4" :value="baseInfoForm.sealReason" readonly
                v-if="baseInfoForm.radioSealOrder==0"></mt-field>
    </div>
    <div>
      <div class="title">合同附件及盖章信息</div>
      <template v-if="cardSealInfoForm.sealAttachments&&cardSealInfoForm.sealAttachments.length"
                v-for="(item,index) in cardSealInfoForm.sealAttachments">
        <SealTable :items="item" :show-header="index===0" v-if="item&&item.length"></SealTable>
      </template>
    </div>
    <div>
      <div class="title">补充信息</div>
      <mt-field label="备注" type="textarea" rows="4" :value="cardRemarkInfoForm.otherInstruction" readonly
                v-if="baseInfoForm.radioSealOrder==0"></mt-field>
    </div>
    <div>
      <div class="title">相关数据</div>
      <el-table :data="cardRelatedInfoForm.contractList">
        <el-table-column type="index" label="序号" width="100px"></el-table-column>
        <el-table-column prop="contractCode" label="合同号"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="company" label="公司"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import printOpts from '../../../filters/printOpts';
  import SealTable from './sealTable.vue';
  import Api from '../../../api/manageContract';

  export default {
    data() {
      return {
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
        Api.getAgreenmentDetail(this.$route.query.id)
          .then((res) => {
            const data = res.data.dataMap;
            const {baseInfoForm, cardSealInfoForm, cardRemarkInfoForm, cardRelatedInfoForm} = data;
            this.baseInfoForm = baseInfoForm;
            this.cardSealInfoForm = cardSealInfoForm;
            this.cardRemarkInfoForm = cardRemarkInfoForm;
            this.cardRelatedInfoForm = cardRelatedInfoForm;
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
      SealTable
    }
  };
</script>
