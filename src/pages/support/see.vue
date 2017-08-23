<style type="text/scss" lang="scss" scoped>
  .form-container {

  }
</style>

<template>
  <div>
    <div v-if="!showTmpl">
      <el-card class="mb20">
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div class="form-container">
          <el-form ref="form" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="模板编号">
                  {{form.templateCode}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="文本名称">
                  {{form.templateName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文本类型">
                  {{form.templateType==='TEMPLATE'?'合同模板':'合同文本'}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="业务类型">
                  {{busiTypeText}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="生效时间">
                  {{form.startDate | formatDate}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="终止时间">
                  {{form.endDate | formatDate}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="创建人">
                  {{creatorName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最新版本">
                  {{version}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最近更新人">
                  {{operatorName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="使用说明">
              {{form.description}}
            </el-form-item>
            <el-form-item label="文本上传" v-show="tplTypeShow">
              <Upload
                :action="action"
                :download="download"
                :fileList.sync="fileList"
                disabled
                multiple>
                <!--<div class="el-upload__tip" slot="tip">文件不超过10M</div>-->
              </Upload>
            </el-form-item>
            <el-form-item v-show="!tplTypeShow">
              <el-button type="primary" @click="showTmpl=true">模板信息</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <Tmpl v-show="showTmpl" :tplInfo="tplInfo" :showTmpl.sync="showTmpl"></Tmpl>
  </div>
</template>

<script>
  import _ from 'lodash';
  import Tmpl from './tmpl.vue';
  import Upload from '@/components/upload.vue';
  import TreeModal from '@/components/treeModal.vue';
  import supportModel from '@/api/support';
  import {uploadUrl, downloadUrl} from '@/api/consts';
  import {formatDate} from '@/filters';

  const defaultData = {
    form: {
      id: '',
      templateCode: '',
      templateName: '',
      templateType: 'TEMPLATE',
      startDate: '',
      description: '',
      files: []
    },
    tplInfo: {},
    action: uploadUrl,
    download: downloadUrl,
    fileList: [],
    endDate: '9999-12-31',
    busiTypeText: '',
    operatorName: '',
    creatorName: '',
    version: '',
    showTmpl: false
  };

  export default {
    data() {
      return Object.assign({
        regions: []
      }, _.cloneDeep(defaultData));
    },
    methods: {
      setData(tplInfo) {
        this.tplInfo = tplInfo;
        this['version'] = `V${tplInfo['version']}`;
        this['operatorName'] = tplInfo['operatorName'];
        this['creatorName'] = tplInfo['creatorName'];
        this['busiTypeText'] = tplInfo['bizTypes'].map(item => item.businessName).join(',');
        tplInfo['files'].forEach((item) => {
          this.fileList.push({
            name: item.fileName,
            url: `${this.download}${item.fileId}`
          });
        });
        Object.keys(this.form).forEach((key) => {
          if (tplInfo.hasOwnProperty(key)) {
            if (key !== 'bizTypes') {
              this.form[key] = tplInfo[key];
            }
          }
        });
      },
      getTplData() {
        supportModel.getTplData({
          templateId: this.$route.params.id
        }).then((res) => {
          console.log(res);
          const tplInfo = res.data.dataMap;
          this.setData(tplInfo);
        });
      }
    },
    components: {
      Tmpl,
      Upload
    },
    created() {
      this.getTplData();
    },
    computed: {
      tplTypeShow() {
        return this.form.templateType === 'TEXT';
      }
    },
    filters: {
      formatDate
    }
  };
</script>
