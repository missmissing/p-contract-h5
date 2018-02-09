<template>
  <el-table :data="items">
    <el-table-column type="index" label="序号" width="80">
      <template slot-scope="scope">
        {{scope.$index + 1}}
      </template>
    </el-table-column>
    <el-table-column prop="sampleCode" label="物料编码"></el-table-column>
    <el-table-column prop="sampleDesc" label="物料描述"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'material-matter-info',
    props: {
      items: Array
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
