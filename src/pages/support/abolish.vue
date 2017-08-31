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
                  <el-form-item label="模板编号" prop="templateCode">
                    <el-autocomplete
                      class="wp100"
                      icon="search"
                      :fetch-suggestions="querySearch"
                      @select="search"
                      v-model="form.templateCode">
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
                  <el-form-item label="文本类型">
                    <el-select
                      v-model="form.templateType"
                      placeholder="请选择"
                      disabled
                      class="wp100">
                      <el-option label="请选择" value=""></el-option>
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
                      disabled
                      type="textarea"
                      v-model="form.busiTypeText"
                      resize="none"
                      :autosize="{maxRows:6}">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="生效时间">
                    <el-input
                      disabled
                      :value="form.startDate | formatDate"
                      class="wp100">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="终止时间">
                    <el-input
                      :value="endDate | formatDate"
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
              <el-form-item label="使用说明">
                <el-input
                  disabled
                  type="textarea"
                  :maxlength="300"
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
                  multiple>
                  <!--<div class="el-upload__tip" slot="tip">文件不超过10M</div>-->
                </Upload>
              </el-form-item>
              <el-form-item v-show="showTpl">
                <el-button type="primary" @click="showTmpl=true">模板信息</el-button>
              </el-form-item>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="停用日期" prop="abolishDate">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.abolishDate"
                      style="width:100%;"
                      :editable="false">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="停用原因" prop="abolishReason">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2 }"
                      resize="none"
                      v-model="form.abolishReason">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
        <el-row class="mt20 mb20 ml20">
          <el-button type="primary" @click="save">提交</el-button>
        </el-row>
      </div>
    </transition>
    <transition name="component-fade" mode="out-in">
      <Tmpl v-show="showTmpl" :tplInfo="tplInfo" :showTmpl.sync="showTmpl"></Tmpl>
    </transition>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Tmpl from './tmpl.vue'
  import Upload from '@/components/upload.vue'
  import comLoading from '@/mixins/comLoading'
  import supportModel from '@/api/support'
  import {uploadUrl, downloadUrl} from '@/api/consts'
  import {formatDate, formatTimeStamp, formatToDate} from '@/filters/moment'

  const defaultData = {
    form: {
      templateCode: '',
      templateName: '',
      templateType: '',
      startDate: '',
      busiTypeText: '',
      description: '',
      files: [],
      operatorName: '',
      creatorName: '',
      version: '',
      abolishDate: '',
      abolishReason: ''
    },
    tplInfo: {},
    fileList: []
  }

  export default {
    mixins: [comLoading],
    data() {
      return Object.assign({
        action: uploadUrl,
        download: downloadUrl,
        endDate: '9999-12-31',
        showTmpl: false,
        rules: {
          templateCode: [{required: true, message: '请输入模板编号', trigger: 'blur'}],
          abolishDate: [{type: 'date', required: true, message: '请选择停用日期', trigger: 'change'}],
          abolishReason: [{required: true, max: 300, message: '请填写停用原因', trigger: 'change'}]
        }
      }, _.cloneDeep(defaultData))
    },
    methods: {
      search() {
        this.comLoading(1)
        supportModel.getCurrentTemplateByCode({
          templateCode: this.form.templateCode
        }).then((res) => {
          console.log(res)
          this.comLoading()
          this.resetForm()
          const tplInfo = res.data.dataMap
          this.setData(tplInfo)
        }, () => {
          this.comLoading()
        })
      },
      setData(tplInfo) {
        const {templateName, templateType, bizTypes, startDate, version, operatorName, creatorName, description, files} = tplInfo
        this.tplInfo = tplInfo
        this.form['templateName'] = templateName
        this.form['templateType'] = templateType
        this.form['busiTypeText'] = bizTypes.map(item => item.businessName).join(',')
        this.form['startDate'] = formatToDate(startDate)
        this.form['version'] = `V${version}`
        this.form['operatorName'] = operatorName
        this.form['creatorName'] = creatorName
        this.form['description'] = description
        if (files.length) {
          files.forEach((item) => {
            this.fileList.push({
              name: item.fileName,
              url: `${this.download}${item.fileId}`,
              status: 'success'
            })
          })
        }
      },
      resetForm() {
        const {id} = this.tplInfo
        if (id) {
          const templateCode = this.form.templateCode
          this.$refs['form'].resetFields()
          this.form.templateCode = templateCode
          this.fileList = []
          this.tplInfo = {}
        }
      },
      getResult() {
        const {id} = this.tplInfo
        const {abolishDate, abolishReason} = this.form
        return {
          templateId: id,
          endDate: formatTimeStamp(abolishDate),
          abolishReason: abolishReason
        }
      },
      back() { // 返回列表页
        this.$router.push('/contemplate/list')
      },
      querySearch(queryString, cb) {
        if (!queryString) {
          return cb([])
        }
        supportModel.selectTemplateCode({
          templateCode: queryString
        }).then((res) => {
          const result = res.data.dataMap || []
          cb(this.createFilter(result))
        }, () => {
          cb([])
        })
      },
      createFilter(result) {
        return result.map((item) => {
          return {value: item, label: item}
        })
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.comLoading(2)
            const result = this.getResult()
            supportModel.setTemplateAbolish(result).then((res) => {
              console.log(res)
              this.comLoading()
              this.$message({
                message: '废除提交成功',
                type: 'success'
              })
              this.back()
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
    },
    filters: {
      formatDate
    }
  }
</script>
