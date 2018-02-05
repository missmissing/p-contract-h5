<template>
  <el-table :data="items">
    <el-table-column type="index" label="序号" width="80">
      <template slot-scope="scope">
        {{scope.$index + 1}}
      </template>
    </el-table-column>
    <el-table-column v-if="contractBusinessTypeFirst!==2" prop="materialCode" label="物料编码"
                     width="250"></el-table-column>
    <el-table-column prop="materialName" :label="contractBusinessTypeFirst===2?'服务名称':'物料名称'"></el-table-column>
    <el-table-column v-if="contractType!==3" prop="total" label="数量" width="100"></el-table-column>
    <el-table-column prop="price" label="价格" width="100"></el-table-column>
    <el-table-column prop="taxRate" label="税率" width="100">
      <template slot-scope="scope">
        {{scope.row.taxRate}}%
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'standard-info',
    props: {
      items: Array,
      contractBusinessTypeFirst: Number,
      contractType: Number
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>

</style>
