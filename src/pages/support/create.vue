<style type="text/scss" lang="scss" scoped>
  .form-container {
    .line {
      text-align: center;
    }
  }
</style>

<template>
  <div>
    <div v-if="!showTmpl">
      <el-card>
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div class="form-container">
          <el-form ref="form" label-width="120px">
            <el-form-item label="文本编号" v-if="disabled">
              <el-col :span="8">
                <el-input v-model="number" class="wp100" disabled></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="文本名称">
              <el-col :span="8">
                <el-input
                  :disabled="disabled"
                  v-model.trim="form.templateName"
                  class="wp100">
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="文本类型">
              <el-col :span="8">
                <el-select
                  v-model="form.templateType"
                  placeholder="请选择"
                  :disabled="disabled"
                  class="wp100">
                  <el-option label="合同模板" value="TEMPLATE"></el-option>
                  <el-option label="合同文本" value="TEXT"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="业务类型">
              <el-col :span="8">
                <el-input
                  type="textarea"
                  :value="busiTypeText"
                  @focus="showTreeModal"
                  resize="none"
                  :autosize="{maxRows:6}"
                  readonly>
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="启用时间">
              <el-col :span="8">
                <el-date-picker
                  type="date"
                  placeholder="开始日期"
                  v-model="form.startDate"
                  @change="formatDate"
                  style="width:100%;"
                  :picker-options="pickerOptions"
                  :editable="false">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2">--</el-col>
              <el-col :span="8">
                <el-input
                  v-model="endDate"
                  class="wp100"
                  disabled
                ></el-input>
              </el-col>
            </el-form-item>
            <el-row v-if="disabled">
              <el-col :span="7">
                <el-form-item label="创建人">
                  <el-input
                    :disabled="disabled"
                    :value="creator"
                    class="wp100">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="最新版本">
                  <el-input
                    :disabled="disabled"
                    :value="version"
                    class="wp100">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="最近更新人">
                  <el-input
                    :disabled="disabled"
                    :value="operatorName"
                    class="wp100">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="使用说明">
              <el-col>
                <el-input
                  type="textarea"
                  :maxlength="300"
                  :autosize="{ minRows: 2 }"
                  resize="none"
                  v-model="form.description">
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="文本上传" v-show="showUpload">
              <el-upload
                drag
                action="/api-contract/contract-web/file/upload/"
                name="files"
                :data="uploadData"
                :on-change="hangdleStatus"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :on-success="uplodeSuccess"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">文件大小不超过10M</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="next">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div v-if="showTmpl">
      <Tmpl :showTmpl.sync="showTmpl"></Tmpl>
    </div>
    <TreeModal
      nodeKey="id"
      title="选择业务类型"
      :visible.sync="visible"
      :defaultProps="defaultProps"
      :regions="regions"
      :initialKeys="form.bizTypes"
      @ok="setBusiType">
    </TreeModal>
  </div>
</template>

<script>
  import moment from 'moment';
  import {mapMutations} from 'vuex';
  import * as types from '../../store/consts';
  import Tmpl from './tmpl.vue';
  import TreeModal from '@/components/treeModal.vue';
  import supportModel from '@/api/support';

  export default {
    data() {
      return {
        form: {
          templateName: '',
          templateType: 'TEMPLATE',
          startDate: '',
          description: '',
          bizTypes: [],
          files: []
        },
        uploadData: {userId: '12'},
        endDate: '9999-12-31',
        number: '',
        busiTypeText: '',
        operatorName: '',
        creator: '',
        version: '',
        regions: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        defaultProps: {
          children: 'children',
          label: 'businessName'
        },
        visible: false,
        showTmpl: false
      };
    },
    methods: {
      hangdleStatus(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      beforeUpload(file) {
        console.log(file);
      },
      uplodeSuccess(response, file, fileList) {
        console.log(response);
        this.form.files = this.form.files.push(response.dataMap.fileId);
      },
      showTreeModal() {
        this.visible = true;
      },
      formatDate(value) {
        this.form.startDate = moment(value).valueOf();
      },
      setBusiType(value, tree) {
        let bizTypes = [];
        let busiTypeText = [];
        const leafs = tree.getCheckedNodes(true);
        leafs.forEach((item) => {
          bizTypes.push(item.id);
          busiTypeText.push(item.businessName);
        });
        this.form.bizTypes = bizTypes;
        this.busiTypeText = busiTypeText.join(',');
      },
      getBusiType() {
        supportModel.getBusiType({}).then((res) => {
          this.regions = res.data.dataMap;
        });
      },
      next() {
        this[types.GET_INFO]({
          info: this.form
        });
        this.showTmpl = true;
      },
      getTmplData() {
        supportModel.getTmplData({}).then((res) => {
          const data = res.data.dataMap;
          this[types.GET_INTIALDATA]({
            initialData: data
          });
          Object.keys(this.form).forEach((key) => {
            if (data.hasOwnProperty(key)) {
              this.form[key] = data[key];
            }
          });
        });
      },
      ...mapMutations([
        types.GET_INFO,
        types.GET_INTIALDATA
      ])
    },
    components: {
      TreeModal,
      Tmpl
    },
    created() {
      this.getBusiType();
    },
    mounted() {
      const id = this.$route.params.id;
      if (id) {
        this.getTmplData();
      }
    },
    watch: {
      $route() {
        const id = this.$route.params.id;
        if (!id) {
          Object.assign(this.form, {
            number: '',
            templateName: '',
            templateType: '',
            startDate: '',
            endDate: '9999-12-31',
            description: '',
            bizTypes: '',
            files: []
          });
          this.showTmpl = false;
        }
        console.log(to, from);
      }
    },
    computed: {
      showUpload() {
        return this.form.templateType === 'TEXT';
      },
      disabled() {
        return !!this.$route.params.id;
      }
    }
  };
</script>
