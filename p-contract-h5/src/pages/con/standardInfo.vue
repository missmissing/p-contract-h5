<template>
  <el-card header="合同标的">
    <el-table :data="cardContentInfoForm.conStandard">
      <el-table-column type="index" label="序号" width="80">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column v-if="baseInfoForm.contractBusinessTypeFirst!==2" prop="materialCode" label="物料编码" width="250"></el-table-column>
      <el-table-column prop="materialName" :label="baseInfoForm.contractBusinessTypeFirst===2?'服务名称':'物料名称'"></el-table-column>
      <el-table-column v-if="baseInfoForm.contractType!==3" prop="total" label="数量" width="100"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column prop="taxRate" label="税率" width="100">
        <template slot-scope="scope">
          {{scope.row.taxRate}}%
        </template>
      </el-table-column>
    </el-table>
    <el-form>
      <el-row class="mt20" v-if="cardContentInfoForm.conStandard.length">
        <el-form-item label="备注" label-width="60px">
          <el-input :disabled="disabled" v-model="cardContentInfoForm.corporeRemark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
          <span class="tip">注：备注内容将会被添加到合同条款中</span>
        </el-form-item>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'standard-info',
    props: {
      cardContentInfoForm: Object,
      baseInfoForm: Object
    },
    computed: {
      ...mapState(['pageStatus']),
      disabled () {
        return this.pageStatus !== 1
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
