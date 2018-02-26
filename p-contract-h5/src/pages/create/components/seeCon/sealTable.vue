<style type="text/scss" lang="scss" scoped>
  .btns {
    display: flex;
  }
</style>

<template>
  <div>
    <el-table :data="items">
      <el-table-column prop="attachType" label="附件类型" width="150px">
        <template slot-scope="scope">
          {{scope.row.attachType | attachmentType}}
        </template>
      </el-table-column>
      <el-table-column prop="fileName" label="文件名称" width="200px">
        <template slot-scope="scope">
          <a class="router-link" :href="scope.row.fileUrl" target="_blank">{{scope.row.fileName}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="haveSeal" label="是否盖章" width="150px">
        <template slot-scope="scope">
          <el-checkbox :disabled="true" v-model="scope.row.haveSeal"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" :disabled="true"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {uploadUrl, downloadUrl} from '../../../../api/consts'
  import {formatDate} from '../../../../filters/moment'
  import attachmentType from '../../../../filters/attachmentType'

  export default {
    props: {
      items: Array,
      baseInfoForm: Object
    },
    data () {
      return {
        uploadUrl,
        downloadUrl
      }
    },
    filters: {
      formatDate,
      attachmentType
    }
  }
</script>
