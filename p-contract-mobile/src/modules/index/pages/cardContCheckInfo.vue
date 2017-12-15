<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <mt-cell title="验收责任人" :value="info.responsibleName"></mt-cell>
    <mt-cell title="验收责任人部门" :value="info.responsibleDeptName"></mt-cell>
    <mt-cell title="服务类验收方式" :value="info.checkType"
             v-if="moreData.baseInfoForm.contractBusinessTypeFirst===2"></mt-cell>
    <el-table class="mb20" :data="info.unionCheckPersons">
      <el-table-column prop="personName" label="联合验收人" min-width="130"></el-table-column>
      <el-table-column prop="personDept" label="联合验收人部门" min-width="150"></el-table-column>
      <el-table-column prop="required" label="是否必选" min-width="100">
        <template scope="scope">
          {{scope.row.required | yesOrNo}}
        </template>
      </el-table-column>
    </el-table>
    <mt-cell title="是否有样品" :value="haveSample | yesOrNo"></mt-cell>
    <div v-if="moreData.baseInfoForm.contractBusinessTypeFirst!==2">
      <div class="title">物资验收事项</div>
      <el-table :data="info.materialMatters">
        <el-table-column type="index" label="序号" width="80">
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="sampleCode" label="物料编码"></el-table-column>
        <el-table-column prop="sampleDesc" label="物料描述"></el-table-column>
      </el-table>
    </div>
    <div v-else>
      <div class="title">服务验收事项</div>
      <el-table :data="info.serviceMatters">
        <el-table-column type="index" label="序号" width="80">
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="serviceName" label="服务名称"></el-table-column>
        <el-table-column prop="serviceRequire" label="验收要求"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import yesOrNo from '../../../filters/yesOrNo';

  export default {
    props: {
      info: {
        type: Object,
        default() {
          return {};
        }
      },
      moreData: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    filters: {
      yesOrNo
    }
  };
</script>
