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
            <el-row v-if="!create">
              <el-col :span="8">
                <el-form-item label="模板编号">
                  <el-autocomplete
                    class="wp100"
                    icon="search"
                    :fetch-suggestions="querySearch"
                    @select="search"
                    placeholder="点击图标进行搜索"
                    v-model="form.templateCode"
                    :on-icon-click="search">
                  </el-autocomplete>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="文本名称">
                  <el-input
                    :disabled="update||abolish"
                    v-model.trim="form.templateName"
                    class="wp100">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="文本类型">
                  <el-select
                    v-model="form.templateType"
                    placeholder="请选择"
                    :disabled="update||abolish"
                    class="wp100">
                    <el-option label="合同模板" value="TEMPLATE"></el-option>
                    <el-option label="合同文本" value="TEXT"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="业务类型">
                  <el-input
                    :disabled="abolish"
                    type="textarea"
                    :value="busiTypeText"
                    @focus="showTreeModal"
                    resize="none"
                    :autosize="{maxRows:6}"
                    readonly>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="!abolish">
              <el-col :span="8">
                <el-form-item label="生效时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.startDate"
                    @change="formatDate"
                    style="width:100%;"
                    :picker-options="pickerOptions"
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
            <el-row v-if="!create">
              <el-col :span="8">
                <el-form-item label="创建人">
                  <el-input
                    disabled
                    :value="creatorName">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最新版本">
                  <el-input
                    disabled
                    :value="version">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最近更新人">
                  <el-input
                    disabled
                    :value="operatorName">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="使用说明">
              <el-input
                :disabled="abolish"
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="form.description">
              </el-input>
            </el-form-item>
            <el-row v-if="abolish">
              <el-col :span="8">
                <el-form-item label="停用日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="abolishForm.endDate"
                    @change="formatDate1"
                    style="width:100%;"
                    :editable="false">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="停用原因">
                  <el-input
                    type="textarea"
                    :maxlength="300"
                    :autosize="{ minRows: 2 }"
                    resize="none"
                    v-model="abolishForm.abolishReason">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="文本上传" v-show="tplTypeShow">
              <el-upload
                :disabled="see||abolish"
                action="/api-contract/contract-web/file/upload/"
                name="file"
                :fileList="fileList"
                :data="uploadData"
                :on-change="hangdleStatus"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :on-success="uplodeSuccess"
                multiple>
                <el-button size="small" type="primary">点击上传</el-button>
                <div class="el-upload__tip" slot="tip">文件大小不超过10M</div>
              </el-upload>
            </el-form-item>
            <el-form-item v-show="!tplTypeShow">
              <el-button type="primary" @click="showTmpl=true">模板信息</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-row class="ml20 mb20">
        <el-row v-if="create||update">
          <el-button @click="save(0)">保 存</el-button>
          <el-button type="primary" @click="save(1)">提 交</el-button>
        </el-row>
        <el-row v-if="abolish">
          <el-button type="primary" @click="abolishFn">提交</el-button>
        </el-row>
      </el-row>
    </div>
    <div v-if="showTmpl">
      <Tmpl :routeName="routeName" :showTmpl.sync="showTmpl"></Tmpl>
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
  import _ from 'lodash';
  import moment from 'moment';
  import {mapMutations} from 'vuex';
  import * as types from '@/store/consts';
  import {routerNames} from '@/core/consts';
  import Tmpl from './tmpl.vue';
  import TreeModal from '@/components/treeModal.vue';
  import supportModel from '@/api/support';

  const defaultData = {
    form: {
      id: '',
      templateCode: '',
      templateName: '',
      templateType: 'TEMPLATE',
      startDate: '',
      description: '',
      bizTypes: [],
      files: []
    },
    fileList: [],
    abolishForm: {
      endDate: '',
      abolishReason: ''
    },
    routeName: '',
    uploadData: {userId: '12'},
    endDate: '9999-12-31',
    busiTypeText: '',
    operatorName: '',
    creatorName: '',
    version: '',
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

  export default {
    data() {
      return Object.assign({
        regions: []
      }, _.cloneDeep(defaultData));
    },
    methods: {
      currentRoute() {
        Object.assign(this.$data, _.cloneDeep(defaultData));
        this.routeName = this.$route.name;
      },
      search() {
        supportModel.getCurrentTemplateByCode({
          templateCode: this.form.templateCode,
        }).then((res) => {
          console.log(res);
          Object.assign(this.$data, _.cloneDeep(defaultData), {routeName: this.$data.routeName});
          const tplInfo = res.data.dataMap;
          this.setData(tplInfo);
        });
      },
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
        this.form.files.push(response.dataMap.fileId);
      },
      showTreeModal() {
        this.visible = true;
      },
      formatDate(value) {
        this.form.startDate = moment(value).valueOf();
      },
      formatDate1(value) {
        this.abolishForm.endDate = value ? moment(value).valueOf() : '';
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
      setData(tplInfo) {
        this[types.SET_TPL_INFO]({
          tplInfo
        });
        this['version'] = `V${tplInfo['version']}`;
        this['busiTypeText'] = tplInfo['bizTypes'].map(item => item.businessName).join(',');
        Object.keys(this.form).forEach((key) => {
          if (tplInfo.hasOwnProperty(key)) {
            if (key === 'bizTypes') {
              this.form[key] = tplInfo[key].map(item => item.typeId);
            } else {
              this.form[key] = tplInfo[key];
            }
          }
        });
      },
      getTplData() {
        if (this.see) {
          supportModel.getTplData({
            templateId: this.$route.params.id
          }).then((res) => {
            console.log(res);
            const tplInfo = res.data.dataMap;
            this.setData(tplInfo);
          });
        }
      },
      getResult() {
        const {info} = this.$store.state.support.create;
        const result = {...this.form, ...info};
        return Object.assign(result, {
          operatorId: 1,
          operatorName: 'haha',
          departmentId: 12,
          departmentName: 'hehe'
        });
      },
      back() { //返回列表页
        this.$router.push('/contemplate/list');
      },
      querySearch(queryString, cb) {
        if (!queryString) {
          return cb([]);
        }
        supportModel.selectTemplateCode({
          templateCode: queryString,
          hasDraft: this.update || false
        }).then((res) => {
          const result = res.data.dataMap;
          cb(this.createFilter(result));
        });
      },
      createFilter(result) {
        return result.map((item) => {
          return {value: item, label: item};
        });
      },
      save(templateStatus) {
        const result = this.getResult();
        result.templateStatus = templateStatus;
        console.log('click save：' + JSON.stringify(result));
        let request = '';
        if (this.create) {
          request = supportModel.addTpl(result);
        } else if (this.update) {
          request = supportModel.updateTemplate(result);
        }
        request.then((res) => {
          console.log(res);
          this.$message({
            message: '保存成功',
            type: 'success',
          });
          if (templateStatus === 1) {
            this.back();
          }
        });
      },
      abolishFn() {
        supportModel.setTemplateAbolish({
          templateId: this.form.id,
          endDate: this.abolishForm.endDate,
          abolishReason: this.abolishForm.abolishReason
        }).then((res) => {
          console.log(res);
          this.$message({
            message: '废除提交成功',
            type: 'success',
          });
        });
      },
      ...mapMutations([
        types.SET_TPL_INFO
      ])
    },
    components: {
      TreeModal,
      Tmpl
    },
    created() {
      this.currentRoute();
      this.getBusiType();
      this.getTplData();
    },
    computed: {
      tplTypeShow() {
        return this.form.templateType === 'TEXT';
      },
      see() {
        return this.routeName === routerNames.con_tpl_see;
      },
      create() {
        return this.routeName === routerNames.con_tpl_create;
      },
      update() {
        return this.routeName === routerNames.con_tpl_update;
      },
      abolish() {
        return this.routeName === routerNames.con_tpl_abolish;
      }
    },
    watch: {
      $route() {
        this.currentRoute();
      }
    }
  };
</script>
