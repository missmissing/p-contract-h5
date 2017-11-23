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
                  <el-form-item label="文本名称" prop="templateName">
                    <el-input
                      v-model.trim="form.templateName"
                      class="wp100">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="类型" prop="templateType">
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
              <el-form-item label="申请原因" prop="description">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  resize="none"
                  v-model="form.description">
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
      <Tmpl v-show="showTmpl" :showTmpl.sync="showTmpl"></Tmpl>
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
  import _ from 'lodash'
  import Tmpl from './tmpl.vue'
  import Upload from '@/components/upload.vue'
  import TreeModal from '@/components/treeModal.vue'
  import supportModel from '@/api/support'
  import getBusiType from '@/mixins/getBusiType'
  import comLoading from '@/mixins/comLoading'
  import createUpdate from '@/mixins/createUpdate'
  import {formatTimeStamp} from '@/filters/moment'

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
    mixins: [getBusiType, comLoading, createUpdate],
    data() {
      return Object.assign({
        endDate: '9999-12-31',
        defaultProps: {
          children: 'children',
          label: 'businessName'
        },
        visible: false,
        showTmpl: false,
        rules: {
          templateName: [{required: true, message: '请输入模板/文本名称'}],
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
        Object.assign(result, {
          files
        })
        return result
      },
      save(templateStatus) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const result = this.getResult()
            if (!this.check(result)) {
              return
            }
            result.templateStatus = templateStatus
            this.comLoading({
              text: '正在提交中'
            })
            supportModel.addTpl(result).then((res) => {
              this.comLoading(false)
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              if (templateStatus === 1) {
                this.back()
              }
            }, () => {
              this.comLoading(false)
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
      showTpl() {
        return this.form.templateType === 'TEMPLATE'
      }
    }
  }
</script>
