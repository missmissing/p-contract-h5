<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div
    v-loading="loadingFlag"
    :element-loading-text="loadingText">
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
                  <el-form-item label="文本名称" prop="templateName">
                    <el-input
                      v-model.trim="form.templateName"
                      class="wp100">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文本类型" prop="templateType">
                    <el-select
                      v-model="form.templateType"
                      placeholder="请选择"
                      class="wp100">
                      <el-option label="合同模板" value="TEMPLATE"></el-option>
                      <el-option label="合同文本" value="TEXT"></el-option>
                    </el-select>
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
                      resize="none"
                      :autosize="{maxRows:6}"
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
              <el-form-item label="使用说明" prop="description">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  resize="none"
                  v-model="form.description">
                </el-input>
              </el-form-item>
              <el-form-item label="文本上传" v-show="showUpload">
                <Upload
                  :action="action"
                  :download="download"
                  :fileList.sync="fileList"
                  :data="uploadData"
                  multiple>
                  <!--<div class="el-upload__tip" slot="tip">文件不超过10M</div>-->
                </Upload>
              </el-form-item>
              <el-form-item v-show="showTpl">
                <el-button type="primary" @click="showTmpl=true">模板信息</el-button>
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
      <Tmpl v-show="showTmpl" :showTmpl.sync="showTmpl"></Tmpl>
    </transition>
    <TreeModal
      nodeKey="id"
      title="选择业务类型"
      :visible.sync="visible"
      :defaultProps="defaultProps"
      :regions="regions"
      :initialKeys="form.bizTypes"
      multi
      @ok="setBusiType">
    </TreeModal>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Tmpl from './tmpl.vue'
  import Upload from '@/components/upload.vue'
  import TreeModal from '@/components/treeModal.vue'
  import supportModel from '@/api/support'
  import getBusiType from '@/mixins/getBusiType'
  import comLoading from '@/mixins/comLoading'
  import {uploadUrl, downloadUrl} from '@/api/consts'
  import {formatTimeStamp} from '@/filters/moment'
  import localStore from 'store'

  const {userId} = localStore.get('user')

  const defaultData = {
    form: {
      templateName: '',
      templateType: null,
      startDate: '',
      description: '',
      bizTypes: [],
      busiTypeText: '',
      files: []
    },
    fileList: []
  }

  export default {
    mixins: [getBusiType, comLoading],
    data() {
      return Object.assign({
        action: uploadUrl,
        download: downloadUrl,
        endDate: '9999-12-31',
        uploadData: {userId,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        defaultProps: {
          children: 'children',
          label: 'businessName'
        },
        visible: false,
        showTmpl: false,
        rules: {
          templateName: [{required: true, message: '请输入模板名称'}],
          templateType: [{required: true, message: '请选择文本类型'}],
          busiTypeText: [{required: true, message: '请选择业务类型', trigger: 'change'}],
          startDate: [{type: 'date', required: true, message: '请选择生效时间', trigger: 'change'}],
          description: [{max: 300, message: '长度不超过300个字符', trigger: 'change'}]
        }
      }, _.cloneDeep(defaultData))
    },
    methods: {
      setBusiType(value, tree) {
        const bizTypes = []
        const busiTypeText = []
        const leafs = tree.getCheckedNodes(true)
        leafs.forEach((item) => {
          bizTypes.push(item.id)
          busiTypeText.push(item.businessName)
        })
        this.form.bizTypes = bizTypes
        this.form.busiTypeText = busiTypeText.join(',')
        this.visible = false
      },
      getResult() {
        const {info} = this.$store.state.support.create
        const {templateName, templateType, startDate, description, bizTypes} = this.form
        const result = Object.assign({
          templateName,
          templateType,
          startDate: formatTimeStamp(startDate),
          description,
          bizTypes
        }, info)
        const files = _.map(this.fileList, (file) => {
          if (file.status === 'success') {
            return file.fileId
          }
        })
        console.log(files)
        Object.assign(result, {
          files,
          operatorId: 1,
          operatorName: 'haha',
          departmentId: 12,
          departmentName: 'hehe'
        })
        console.log(result)
        return result
      },
      back() { // 返回列表页
        this.$router.push('/contemplate/list')
      },
      save(templateStatus) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.comLoading(1)
            const result = this.getResult()
            result.templateStatus = templateStatus
            console.log('click save：', result)
            supportModel.addTpl(result).then((res) => {
              console.log(res)
              this.comLoading()
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              if (templateStatus === 1) {
                this.back()
              }
            }, () => {
              this.comLoading()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    components: {
      TreeModal,
      Tmpl,
      Upload
    },
    computed: {
      showUpload() {
        return this.form.templateType === 'TEXT'
      },
      showTpl() {
        return this.form.templateType === 'TEMPLATE'
      }
    }
  }
</script>
