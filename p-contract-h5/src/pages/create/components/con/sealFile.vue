<template>
  <div>
    <el-upload v-show="!ifuploadSealFile" :show-file-list="false" :action="uploadUrl" :with-credentials="true" :on-success="handleUploadFileAfterSealSuccess">
      <el-button size="small" type="primary">上传</el-button>
    </el-upload>
    <el-table :data="items">
      <el-table-column label="文件名" prop="sealFileName">
        <template slot-scope="scope">
          <a class="router-link" :href="scope.row.sealFileUrl" target="_blank">{{scope.row.sealFileName}}</a>
        </template>
      </el-table-column>
      <el-table-column label="上传人" prop="sealFileCreatorName" width="130"></el-table-column>
      <el-table-column label="上传时间" prop="sealFileCreateTime" width="130">
        <template slot-scope="scope">
          {{scope.row.sealFileCreateTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" v-if="!ifuploadSealFile">
        <template slot-scope="scope">
          <el-button v-if="scope.row.addNew" type="danger" size="small" @click="handleRemove(scope.$index, scope.row.filesSealed)">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {uploadUrl} from '../../../../api/consts'
  import {formatDate} from '../../../../filters/moment'

  export default {
    name: 'seal-files',
    props: {
      items: Array
    },
    data () {
      return {
        uploadUrl
      }
    },
    computed: {
      ...mapGetters(['backLogSealRole', 'backLogPurchaseRole']),
      // 是否允许上传盖章后附件
      ifuploadSealFile () {
        if (this.backLogSealRole || this.backLogPurchaseRole) {
          return false
        }
        return true
      }
    },
    methods: {
      handleRemove (index, rows) {
        rows.splice(index, 1)
      },
      handleUploadFileAfterSealSuccess (response) {
        const {code, dataMap} = response
        if (code !== '200') {
          this.$message.error(dataMap.message)
          return
        }
        const {
          fileId,
          fileName,
          userName,
          userId,
          createTime
        } = dataMap
        this.cardSealInfoForm.filesSealed.push({
          sealFileId: fileId,
          sealFileName: fileName,
          sealFileUrl: `${this.downloadUrl}${fileId}`,
          sealFileCreatorName: userName,
          sealFileCreatorId: userId,
          sealFileCreateTime: formatDate(createTime),
          addNew: true
        })
        this.$message.success('文件上传成功')
      }
    },
    filters: {
      formatDate
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
