<style type="text/scss" lang="scss" scoped>
  .btns {
    display: flex;
  }
</style>

<template>
  <div>
    <el-button type="primary" @click="add" size="small" prefix-icon="el-icon-plus" class="mb20" v-if="showAdd">添加
    </el-button>
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
          <el-checkbox v-model="scope.row.haveSeal" :disabled="disabledFn(scope.row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" :disabled="disabledFn(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <div class="btns">
            <el-upload v-if="ifUploadFile(scope.row)" :show-file-list="false" :action="uploadUrl" :with-credentials="true" :on-success="handleUploadSealFileSuccess.bind(this,scope.row)">
              <el-button size="small" type="primary">上传</el-button>
            </el-upload>
            <el-button v-if="!scope.row.id" class="ml20" @click="handleRemove(scope.$index,items)" type="danger" size="small">
              移除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import {uploadUrl, downloadUrl} from '../../../api/consts'
  import {formatDate} from '../../../filters/moment'
  import attachmentType from '../../../filters/attachmentType'

  import bus from '../../../core/bus'

  export default {
    props: {
      items: Array
    },
    data () {
      return {
        uploadUrl,
        downloadUrl
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      showAdd () {
        return this.pageStatus === 1
      }
    },
    methods: {
      disabledFn (row) {
        const {attachType, id} = row
        if (attachType === 3) {
          return true
        }
        if (id) {
          return true
        }
        return false
      },
      ifUploadFile (row) {
        const {attachType, id} = row
        if (attachType === 3) {
          return false
        }

        if (!id) {
          return true
        }
        return true
      },
      add () {
        const file = {
          fileName: '',
          fileUrl: '',
          attachType: 1,
          haveSeal: true,
          remark: ''
        }
        this.items.push(file)
      },
      handleRemove (index, rows) {
        rows.splice(index, 1)
        bus.$emit('sealInfoValid')
      },
      handleUploadSealFileSuccess (row, response) {
        const {code, dataMap} = response
        if (code !== '200') {
          this.$message.error(dataMap.message)
          return
        }
        const {fileId} = dataMap
        row.fileId = dataMap.fileId
        row.fileName = dataMap.fileName
        row.fileUrl = `${this.downloadUrl}${fileId}`
        this.$message.success('文件上传成功')
        bus.$emit('sealInfoValid')
      }
    },
    filters: {
      formatDate,
      attachmentType
    }
  }
</script>
