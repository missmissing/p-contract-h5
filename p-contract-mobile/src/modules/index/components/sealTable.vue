<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <el-table :data="items">
    <el-table-column prop="attachType" label="附件类型" width="100px">
      <template slot-scope="scope">
        {{scope.row.attachType | attachmentType}}
      </template>
    </el-table-column>
    <el-table-column prop="fileName" label="文件名称" min-width="200px">
      <template slot-scope="scope">
        <a class="file-item" :download="scope.row.fileName"
           @click="openFile(scope.row.fileUrl)">{{scope.row.fileName}}</a>
      </template>
    </el-table-column>
    <el-table-column prop="haveSale" label="是否盖章" width="100px">
      <template slot-scope="scope">
        {{scope.row.haveSale | yesOrNo}}
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注"></el-table-column>
  </el-table>
</template>

<script>
  import {formatDate} from '../../../filters/moment'
  import attachmentType from '../../../filters/attachmentType'
  import printChapter from '../../../filters/printChapter'
  import yesOrNo from '../../../filters/yesOrNo'

  export default {
    props: {
      items: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      openFile (path, id) {
        if (!id) {
          return
        }
        window._____processCenterPageAction('opennewwindow', {path})
      }
    },
    filters: {
      formatDate,
      attachmentType,
      printChapter,
      yesOrNo
    }
  }
</script>
