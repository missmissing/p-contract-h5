<template>
  <div>
    <el-upload
      :action="action"
      :download="download"
      :name="name"
      :show-file-list="false"
      :fileList="fileList"
      :data="data"
      :on-change="onChange"
      :on-progress="onProgress"
      :on-success="onSuccess"
      :on-error="onError"
      :disabled="disabled"
      multiple>
      <el-button size="small" type="primary">点击上传</el-button>
      <slot name="tip"></slot>
    </el-upload>
    <ul class="el-upload-list el-upload-list--text">
      <li class="el-upload-list__item is-success" v-for="(file,index) in uploadFiles">
        <a class="el-upload-list__item-name" :href="file.url">
          <i class="el-icon-document"></i>{{file.name}}
        </a>
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-circle-check"></i>
        </label>
        <i class="el-icon-close" v-if="!disabled" @click="onRemove(index,file)"></i>
        <el-progress
          v-if="file.status === 'uploading'"
          :stroke-width="2"
          :percentage="parsePercentage(file.percentage)">
        </el-progress>
      </li>
    </ul>
  </div>
</template>

<script>
  import {uploadUrl, downloadUrl} from '../api/consts';

  export default {
    data() {
      return {
        action: uploadUrl,
        download: downloadUrl,
        uploadFiles: []
      };
    },
    props: {
      name: {
        type: String,
        default: 'file'
      },
      data: Object,
      headers: Object,
      withCredentials: Boolean,
      multiple: Boolean,
      accept: String,
      beforeUpload: Function,
      fileList: Array,
      disabled: Boolean
    },
    methods: {
      onChange(file, fileList) {
        if (file.status !== 'ready') {
          return;
        }
        this.uploadFiles = fileList;
      },
      onProgress(ev, rawFile) {
        const file = this.getFile(rawFile);
        file.status = 'uploading';
        file.percentage = ev.percent || 0;
      },
      onSuccess(response, file, fileList) {
        console.log(response, file, fileList);
        const {code, dataMap} = response;
        this.$message.error(dataMap.message);
        if (code !== '200') {
          fileList.splice(-1);
          this.$emit('update:fileList', fileList);
          return;
        }
        const {fileId} = dataMap;
        file.url = this.download ? `${this.download}${fileId}` : '';
        file.fileId = fileId;
        this.$emit('update:fileList', fileList);
      },
      onError(err, file, fileList) {
        if (err) {
          console.log(err);
        }
        this.$emit('update:fileList', fileList);
      },
      onRemove(index) {
        this.uploadFiles.splice(index, 1);
        this.$emit('update:fileList', this.uploadFiles);
      },
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      getFile(rawFile) {
        const fileList = this.uploadFiles;
        let target;
        fileList.every(item => {
          target = rawFile.uid === item.uid ? item : null;
          return !target;
        });
        return target;
      }
    },
    created() {
      if (this.fileList.length) {
        this.fileList = this.fileList.map((item) => ({
          name: item.fileName,
          url: `${this.download}${item.fileId}`,
          status: 'success'
        }));
      }
      this.uploadFiles = this.fileList;
    }
  };
</script>
