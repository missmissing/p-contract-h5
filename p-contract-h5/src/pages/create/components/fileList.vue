<template>
  <el-table :data="items">
    <el-table-column label="文件名" prop="fileName">
      <template slot-scope="scope">
        <a class="router-link" :href="scope.row.fileUrl" target="_blank">{{scope.row.fileName}}</a>
      </template>
    </el-table-column>
    <el-table-column label="上传人" prop="creatorName" width="130"></el-table-column>
    <el-table-column label="上传时间" prop="createTime" width="130">
      <template slot-scope="scope">
        {{scope.row.createTime | formatDate}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {formatDate} from '../../../filters/moment'

  export default {
    name: 'file-list',
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
