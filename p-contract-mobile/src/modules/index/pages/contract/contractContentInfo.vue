<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <div class="mb20">
      <div class="title">合同供应商信息</div>
      <el-table :data="info.tableSupplierInfo">
        <el-table-column type="index" label="序号" width="80">
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="供应商编号" width="120"></el-table-column>
        <el-table-column prop="name" label="供应商名称" min-width="250"></el-table-column>
      </el-table>
    </div>
    <div class="mb20">
      <div class="title">合同我方主体名称</div>
      <el-table :data="info.conSubjctName">
        <el-table-column prop="code" label="公司代码" width="100"></el-table-column>
        <el-table-column prop="name" label="公司名称" min-width="250"></el-table-column>
        <el-table-column prop="applyAll" label="全公司适用" min-width="130">
          <template scope="scope">
            {{scope.row.applyAll | yesOrNo}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mb20" v-if="moreData.baseInfoForm.contractType!==2">
      <div class="title">第三方信息</div>
      <el-table :data="info.thirdPartyInfo">
        <el-table-column prop="code" label="供应商编号" width="120"></el-table-column>
        <el-table-column prop="name" label="供应商名称" min-width="250"></el-table-column>
      </el-table>
    </div>
    <div class="mb20" v-if="moreData.baseInfoForm.contractType!==4">
      <div class="title">合同标的</div>
      <el-table :data="info.conStandard">
        <el-table-column type="index" label="序号" width="80">
          <template scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column v-if="moreData.baseInfoForm.contractBusinessTypeFirst!==2" prop="materialCode" label="物料编码"
                         width="130"></el-table-column>
        <el-table-column prop="materialName"
                         :label="moreData.baseInfoForm.contractBusinessTypeFirst===2?'服务名称':'物料名称'"
                         min-width="250"></el-table-column>
        <el-table-column v-if="moreData.baseInfoForm.contractType!==3" prop="total" label="数量"
                         width="100"></el-table-column>
        <el-table-column prop="price" label="价格" width="100"></el-table-column>
        <el-table-column prop="taxRate" label="税率" width="100">
          <template scope="scope">
            {{scope.row.taxRate}}%
          </template>
        </el-table-column>
      </el-table>
      <mt-cell title="备注" :value="info.corporeRemark">
      </mt-cell>
    </div>
    <mt-cell title="生效条件" :value="info.effectiveCondition | effectiveCondition"></mt-cell>
    <div v-if="info.effectiveCondition===1">
      <mt-cell title="合同生效日期" :value="info.startTime | formatDate"></mt-cell>
      <mt-cell title="合同终止日期" :value="info.endTime | formatDate"></mt-cell>
    </div>
    <div v-if="info.effectiveCondition===2">
      <mt-cell title="备注" :value="info.conditionDesc"></mt-cell>
    </div>
  </div>
</template>

<script>
  import yesOrNo from '../../../../filters/yesOrNo';
  import effectiveCondition from '../../../../filters/effectiveCondition';
  import {formatDate} from '../../../../filters/moment';

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
      yesOrNo,
      formatDate,
      effectiveCondition
    }
  };
</script>
