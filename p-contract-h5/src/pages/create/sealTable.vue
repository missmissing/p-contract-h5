<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <el-table :data="items" :show-header="showHeader" row-key="attachType" :expand-row-keys="expandkeys">
    <el-table-column type="expand" v-if="items[0].haveSale">
      <template scope="scope">
        <div v-if="items[0].haveSale" class="pt20">
          <el-table :data="scope.row.filesSealed" class="mb20"
                    v-if="scope.row.filesSealed&&scope.row.filesSealed.length">
            <el-table-column label="文件名" prop="sealFileName">
              <template scope="scope1">
                <a class="router-link" :href="scope1.row.sealFileUrl" target="_blank">{{scope1.row.sealFileName}}</a>
              </template>
            </el-table-column>
            <el-table-column label="上传人" prop="sealFileCreatorName" width="130"></el-table-column>
            <el-table-column label="上传时间" prop="sealFileCreateTime" width="130">
              <template scope="scope1">
                {{scope1.row.sealFileCreateTime | formatDate}}
              </template>
            </el-table-column>
            <el-table-column label="操作" v-if="scope.row.filesSealed[0].addNew" width="100">
              <template scope="scope1">
                <el-button
                  @click="handleRemove(scope1.$index, scope.row.filesSealed)"
                  type="danger"
                  size="small">移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <el-col :span="6">
              <el-form-item label="用章次数" prop="saleTime">
                <el-input-number size="small" :disabled="true" v-model="scope.row.saleTime" class="wp100">
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="打印份数" prop="printTime" class="is-required">
                <el-input-number
                  size="small"
                  :disabled="timesDisabled"
                  :min="0"
                  :max="10"
                  v-model="scope.row.printTime"
                  @change="validateForm"
                  class="wp100"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="留存份数" prop="remainTime" class="is-required">
                <el-input-number
                  size="small"
                  :disabled="timesDisabled"
                  :min="0"
                  :max="10"
                  v-model="scope.row.remainTime"
                  @change="validateForm"
                  class="wp100"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用印后上传">
                <el-upload
                  ref="uploadFileAfterSeal"
                  :show-file-list="false"
                  :action="uploadUrl"
                  :with-credentials="true"
                  :on-success="handleUploadFileAfterSealSuccess.bind(this,scope.row)"
                >
                  <el-button size="small" type="primary" :disabled="uploadSealDisabled">上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="选择用章" prop="saleInfos" class="is-required">
                <el-checkbox-group v-model="scope.row.saleInfos" @change="validateForm">
                  <el-checkbox label="1" :disabled="selectSealDisabled" name="sealInfo">公章</el-checkbox>
                  <el-checkbox label="2" :disabled="selectSealDisabled" name="sealInfo">法人章</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="attachType" label="附件类型" width="150px">
      <template scope="scope">
        {{scope.row.attachType | attachmentType}}
      </template>
    </el-table-column>
    <el-table-column prop="fileName" label="文件名称" width="200px">
      <template scope="scope">
        <a class="router-link" :href="scope.row.fileUrl" target="_blank">{{scope.row.fileName}}</a>
        <el-upload
          v-if="coverUploadDisabled"
          ref="uploadSealFile"
          :show-file-list="false"
          :action="uploadUrl"
          :with-credentials="true"
          :on-success="coverUploadUploadSealFileSuccess.bind(this,scope.row)"
        >
          <el-button size="small" type="primary">替换</el-button>
        </el-upload>
      </template>
    </el-table-column>
    <el-table-column prop="upload" label="上传" width="100px" v-if="!ifFind(removeColumns,'upload')">
      <template scope="scope">
        <el-upload
          ref="uploadSealFile"
          :show-file-list="false"
          :action="uploadUrl"
          :with-credentials="true"
          :on-success="handleUploadSealFileSuccess.bind(this,scope.row)"
        >
          <el-button size="small" type="primary" :disabled="uploadFileDisabled">上传</el-button>
        </el-upload>
      </template>
    </el-table-column>
    <el-table-column prop="haveSale" label="是否盖章" width="150px">
      <template scope="scope">
        <el-checkbox
          :disabled="sealDisabled"
          :checked="scope.row.haveSale"
          @change="handleChange(scope.row,$event)"
        ></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注">
      <template scope="scope">
        <el-input v-model="scope.row.remark" :disabled="remarkDisabled"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      v-if="!ifFind(removeColumns,'handleBtns')"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button
          v-if="scope.row.addNew"
          @click="del"
          type="danger"
          size="small">移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {uploadUrl, downloadUrl} from '../../api/consts';
  import {formatDate} from '../../filters/moment';
  import attachmentType from '../../filters/attachmentType';

  export default {
    props: {
      items: {
        type: Array,
        default() {
          return [];
        }
      },
      showHeader: {
        type: Boolean,
        default: false
      },
      removeColumns: {
        type: Array,
        default() {
          return [];
        }
      },
      moreDatas: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        uploadUrl,
        downloadUrl,
        expandkeys: []
      };
    },
    computed: {
      //打印份数，留存份数
      timesDisabled() {
        const {
          type,
          isSee,
          isModify,
          isSealRole,
          backLogCreator
        } = this.moreDatas;
        if (backLogCreator) {
          return false;
        }
        if (type === 1) {
          if (isSee && !isSealRole) {
            return true;
          }
          if (isModify) {
            return true;
          }
        } else {
          if (isSee && !isSealRole) {
            return true;
          }
          if (isModify) {
            return true;
          }
        }
        return false;
      },
      //用印上传按钮
      uploadSealDisabled() {
        const {
          isSee,
          isSealRole,
          isPurchaseRole
        } = this.moreDatas;
        if (isSee) {
          if (this.items[0].filesSealed && this.items[0].filesSealed.length) {
            return true;
          }
          if (isSealRole || isPurchaseRole) {
            return false;
          }
        }
        return true;
      },
      //选择用章
      selectSealDisabled() {
        const {isSee, isModify} = this.moreDatas;
        if (isSee || isModify) {
          return true;
        }
        return false;
      },
      //上传按钮
      uploadFileDisabled() {
        const {isSee, backLogCreator} = this.moreDatas;
        const {addNew} = this.items[0];
        if (!addNew) {
          return true;
        }
        if (backLogCreator) {
          return false;
        }
        if (isSee) {
          return true;
        }
        return false;
      },
      //是否盖章
      sealDisabled() {
        const {type} = this.moreDatas;
        if (type === 1) {
          return true;
        }
        return this.uploadFileDisabled;
      },
      //备注
      remarkDisabled() {
        return this.sealDisabled;
      },
      //流程覆盖上传按钮
      coverUploadDisabled() {
        const {type, tplType, backLogCreator} = this.moreDatas;
        return (type === 1 && tplType === 2 && backLogCreator);
      }
    },
    methods: {
      ifFind(columns, column) {
        return columns.indexOf(column) > -1;
      },
      handleChange(item, event) {
        item.haveSale = event.target.checked;
        this.expandkeys = [];
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
        this.$message.success('文件上传成功');
      },
      coverUploadUploadSealFileSuccess(row, response) {
        const {code, dataMap} = response;
        if (code !== '200') {
          this.$message.error(dataMap.message);
          return;
        }
        const {fileId} = dataMap;
        row.fileId = dataMap.fileId;
        row.fileName = dataMap.fileName;
        row.fileUrl = `${this.downloadUrl}${fileId}`;
        row.id && delete row.id;
        this.$message.success('文件上传成功');
      },
      handleUploadFileAfterSealSuccess(row, response) {
        const {code, dataMap} = response;
        if (code !== '200') {
          this.$message.error(dataMap.message);
          return;
        }
        const {
          fileId,
          fileName,
          userName,
          userId,
          createTime
        } = dataMap;
        const filesSealed = [{
          sealFileId: fileId,
          sealFileName: fileName,
          sealFileUrl: `${this.downloadUrl}${fileId}`,
          sealFileCreatorName: userName,
          sealFileCreatorId: userId,
          sealFileCreateTime: formatDate(createTime),
          addNew: true
        }];
        this.$set(row, 'filesSealed', filesSealed);
        this.$message.success('文件上传成功');
      },
      del() {
        this.$emit('handleRemove');
      },
      validateForm() {
        this.$emit('validateForms');
      }
    },
    filters: {
      formatDate,
      attachmentType
    }
  };
</script>
