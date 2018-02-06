<style type="text/scss" lang="scss" scoped>
  .btns {
    display: flex;
  }
</style>

<template>
  <div>
    <el-button
      type="primary"
      @click="add"
      size="small"
      prefix-icon="el-icon-plus"
      v-if="addLoad"
      class="mb20">
      添加
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
      <el-table-column prop="haveSale" label="是否盖章" width="150px">
        <template slot-scope="scope">
          <el-checkbox
            :disabled="disabled(scope.row)"
            v-model="scope.row.haveSale"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" :disabled="disabled(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <div class="btns">
            <el-upload
              ref="uploadSealFile"
              :show-file-list="false"
              :action="uploadUrl"
              :with-credentials="true"
              :on-success="handleUploadSealFileSuccess.bind(this,scope.row)"
            >
              <el-button size="small" type="primary" :disabled="uploadFileDisabled(scope.row)">上传</el-button>
            </el-upload>
            <el-button
              v-if="!scope.row.id"
              class="ml20"
              @click="handleRemove(scope.$index,items)"
              type="danger"
              size="small">移除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {uploadUrl, downloadUrl} from '../../api/consts';
  import {formatDate} from '../../filters/moment';
  import attachmentType from '../../filters/attachmentType';

  export default {
    props: {
      items: Array,
      backLogCreator: Boolean,
      tplType: Number
    },
    data() {
      return {
        uploadUrl,
        downloadUrl
      };
    },
    computed: {
      ...mapGetters([
        'isCreate',
        'isModify',
        'isSee',
        'isProcess'
      ]),
      addLoad() {
        if (this.backLogCreator) {
          return true;
        }
        if (!this.isSee && !this.isProcess) {
          return true;
        }
        return false;
      }
    },
    methods: {
      disabled(row) {
        if (row.attachType === 3) {
          return true;
        }
        if (row.id) {
          return true;
        }
        if (this.backLogCreator) {
          return false;
        }
        if (this.isSee || this.isProcess) {
          return true;
        }
        return false;
      },
      uploadFileDisabled(row) {
        const {attachType, id} = row;
        if (attachType === 3) {
          if (this.isCreate || this.isModify) {
            return true;
          }
          if (this.backLogCreator && this.tplType === 2) {
            return false;
          }
        }

        if (!id) {
          return false;
        }
        if (this.isSee || this.isProcess) {
          return true;
        }
        return true;
      },
      //流程覆盖上传按钮
      coverUpload(row) {
        return (row.attachType === 3 && this.tplType === 2 && this.backLogCreator);
      },
      add() {
        const file = {
          fileName: '',
          fileUrl: '',
          attachType: 1,
          haveSale: true,
          remark: ''
        };
        this.items.push(file);
      },
      handleRemove(index, rows) {
        rows.splice(index, 1);
      },
      handleUploadSealFileSuccess(row, response) {
        const {code, dataMap} = response;
        if (code !== '200') {
          this.$message.error(dataMap.message);
          return;
        }
        const {fileId} = dataMap;
        row.fileId = dataMap.fileId;
        row.fileName = dataMap.fileName;
        row.fileUrl = `${this.downloadUrl}${fileId}`;
        if (this.coverUpload(row)) {
          row.id && delete row.id;
        }
        this.$message.success('文件上传成功');
      }
    },
    filters: {
      formatDate,
      attachmentType
    }
  };
</script>
