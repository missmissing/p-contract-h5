<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <transition name="component-fade" mode="out-in">
      <div v-show="!showTmpl">
        <el-card>
          <div slot="header">
            <span class="common-title">基本信息</span>
          </div>
          <div>
            <el-form :model="form" :rules="rules" ref="form" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="模板编号" prop="templateCode">
                    <el-autocomplete
                      class="wp100"
                      :fetch-suggestions="querySearch"
                      @select="search"
                      v-model="form.templateCode"
                      :trigger-on-focus="false">
                    </el-autocomplete>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="文本名称">
                    <el-input
                      disabled
                      v-model.trim="form.templateName"
                      class="wp100">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="类型">
                    <el-input
                      :value="form.templateType"
                      disabled>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="业务类型" prop="busiTypeText">
                    <el-input
                      type="textarea"
                      v-model="form.busiTypeText"
                      @focus="visible = true"
                      readonly>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="生效时间" prop="startDate">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.startDate"
                      style="width:100%;"
                      :editable="false">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="终止时间">
                    <el-input
                      v-model="endDate"
                      class="wp100"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="创建人">
                    <el-input
                      disabled
                      :value="form.creatorName">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最新版本">
                    <el-input
                      disabled
                      :value="form.version">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最近更新人">
                    <el-input
                      disabled
                      :value="form.operatorName">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="申请原因" prop="description">
                <el-input
                  type="textarea"
                  v-model.trim="form.description">
                </el-input>
              </el-form-item>
              <el-form-item label="附件上传">
                <Upload
                  :fileList.sync="fileList"
                  multiple>
                  <!--<div class="el-upload__tip" slot="tip">文件不超过10M</div>-->
                </Upload>
              </el-form-item>
              <el-form-item v-show="showTpl">
                <el-button size="small" type="primary" @click="showTmpl=true">模板信息</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-row class="mt20 mb20 ml20">
          <!--<el-button @click="save(0)">保 存</el-button>-->
          <el-button type="primary" @click="save(1)">提 交</el-button>
        </el-row>
      </div>
    </transition>
    <transition name="component-fade" mode="out-in">
      <Tmpl v-show="showTmpl" :tplInfo="tplInfo" :showTmpl.sync="showTmpl" @getData="getTmplData"/>
    </transition>
    <TreeModal
      nodeKey="id"
      title="选择业务类型"
      :visible.sync="visible"
      :defaultProps="defaultProps"
      :regions="regions"
      :initialKeys="form.bizTypes"
      multiple
      @ok="setBusiType">
    </TreeModal>
  </div>
</template>

<script>
  import Tmpl from './tmpl.vue';
  import Upload from '../../components/upload.vue';
  import TreeModal from '../../components/treeModal.vue';
  import supportModel from '../../api/support';
  import getBusiType from '../../mixins/getBusiType';
  import comLoading from '../../mixins/comLoading';
  import createUpdate from '../../mixins/createUpdate';
  import {formatTimeStamp, formatToDate} from '../../filters/moment';
  import {tplTypeMap} from '../../core/consts';

  export default {
    mixins: [getBusiType, comLoading, createUpdate],
    data() {
      return {
        form: {
          id: '',
          templateCode: '',
          templateName: '',
          templateType: null,
          startDate: '',
          bizTypes: [],
          busiTypeText: '',
          description: '',
          files: [],
          operatorName: '',
          creatorName: '',
          version: ''
        },
        endDate: '9999-12-31',
        tplInfo: {},
        fileList: [],
        defaultProps: {
          children: 'children',
          label: 'businessName'
        },
        visible: false,
        showTmpl: false,
        rules: {
          templateCode: [{required: true, message: '请输入模板编号', trigger: 'blur'}],
          busiTypeText: [{required: true, message: '请选择业务类型', trigger: 'change'}],
          startDate: [{
            type: 'date', required: true, message: '请选择生效时间', trigger: 'change'
          }],
          description: [{max: 300, message: '长度不超过300个字符', trigger: 'change'}]
        }
      };
    },
    methods: {
      createFilter(result) {
        return result.map((item) => ({value: item}));
      },
      querySearch(queryString, cb) {
        if (!queryString) {
          return cb([]);
        }
        return supportModel.selectTemplateCode({
          templateCode: queryString,
          type: 1
        }).then((res) => {
          const result = res.data.dataMap || [];
          cb(this.createFilter(result));
        }, () => cb([]));
      },
      search() {
        this.comLoading();
        supportModel.getCurrentTemplateByCode({
          templateCode: this.form.templateCode
        }).then((res) => {
          this.comLoading(false);
          this.resetForm();
          const tplInfo = res.data.dataMap;
          this.setData(tplInfo);
        }, () => {
          this.comLoading(false);
        });
      },
      setBusiType(value, tree) {
        const bizTypes = [];
        const busiTypeText = [];
        const leafs = tree.getCheckedNodes(true);
        leafs.forEach((item) => {
          bizTypes.push(item.id);
          busiTypeText.push(item.businessName);
        });
        this.form.bizTypes = bizTypes;
        this.form.busiTypeText = busiTypeText.join(',');
        this.visible = false;
      },
      setData(tplInfo) {
        const {
          templateName,
          templateType,
          bizTypes,
          startDate,
          version,
          operatorName,
          creatorName,
          description,
          files
        } = tplInfo;
        this.tplInfo = tplInfo;
        this.form.templateName = templateName;
        this.form.templateType = tplTypeMap[templateType];
        this.form.bizTypes = bizTypes.map(item => item.typeId);
        this.form.busiTypeText = bizTypes.map(item => item.businessName).join(',');
        this.form.startDate = formatToDate(startDate);
        this.form.version = `V${version}`;
        this.form.operatorName = operatorName;
        this.form.creatorName = creatorName;
        this.form.description = description;
        if (files.length) {
          files.forEach((item) => {
            this.fileList.push({
              name: item.fileName,
              url: `${this.download}${item.fileId}`,
              status: 'success',
              fileId: item.fileId
            });
          });
        }
      },
      resetForm() {
        const {id} = this.tplInfo;
        if (id) {
          const templateCode = this.form.templateCode;
          this.$refs.form.resetFields();
          this.form.templateCode = templateCode;
          this.fileList = [];
          this.tplInfo = {};
        }
      },
      getResult() {
        const {id} = this.tplInfo;
        const {
          startDate,
          description,
          bizTypes,
          contentModule,
          content,
          templateFileContents,
          labels
        } = this.form;
        const result = Object.assign({
          id,
          startDate: formatTimeStamp(startDate),
          description,
          bizTypes,
          contentModule,
          content,
          templateFileContents,
          labels
        });
        const files = [];
        this.fileList.forEach((file) => {
          if (file.status === 'success') {
            files.push(file.fileId);
          }
        });
        Object.assign(result, {
          files
        });
        return result;
      },
      save(templateStatus) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            const result = this.getResult();

            if (!this.check(result)) {
              return;
            }
            this.comLoading({
              text: '正在提交中'
            });
            result.templateStatus = templateStatus;

            supportModel.updateTemplate(result).then(() => {
              this.comLoading(false);
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              if (templateStatus === 1) {
                this.back();
              }
            }, () => {
              this.comLoading(false);
            });
          } else {
            console.log('error submit!!');
          }
        });
      }
    },
    components: {
      TreeModal,
      Tmpl,
      Upload
    },
    computed: {
      showTpl() {
        return this.tplInfo.templateType === 'TEMPLATE';
      }
    }
  };
</script>
