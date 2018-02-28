<template>
  <el-table :data="items">
    <el-table-column type="index" label="序号" width="100px"></el-table-column>
    <el-table-column prop="contractCode" label="合同号"></el-table-column>
    <el-table-column prop="type" label="类型"></el-table-column>
    <el-table-column prop="status" label="状态"></el-table-column>
    <el-table-column prop="company" label="公司"></el-table-column>
    <el-table-column prop="startTime" label="开始时间"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'relate-table',
    props: {
      items: Array
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
