<template>
  <div>
    <el-table :data="items">
      <el-table-column label="文件名" prop="sealFileName">
        <template scope="scope">
          <a class="router-link" :href="scope.row.sealFileUrl" target="_blank">{{scope.row.sealFileName}}</a>
        </template>
      </el-table-column>
      <el-table-column label="上传人" prop="sealFileCreatorName" width="130"></el-table-column>
      <el-table-column label="上传时间" prop="sealFileCreateTime" width="130">
        <template scope="scope">
          {{scope.row.sealFileCreateTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {formatDate} from '../../../filters/moment'

  export default {
    name: 'seal-files',
    props: {
      items: Array
    },
    filters: {
      formatDate
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
