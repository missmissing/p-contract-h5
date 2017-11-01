<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div id="container">
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
              <el-form-item label="申请原因">
                <el-input
                  disabled
                  type="textarea"
                  :maxlength="300"
                  :autosize="{ minRows: 2 }"
                  resize="none"
                  v-model="form.description">
                </el-input>
              </el-form-item>
              <el-form-item label="附件上传" v-if="fileList.length">
                <el-table
                  :data="fileList"
                  border
                  highlight-current-row
                  class="wp100">
                  <el-table-column
                    prop="fileName"
                    label="文件名">
                    <template scope="scope">
                      <a class="router-link" :href="`${download}${scope.row.fileId}`">{{scope.row.fileName}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="operatorName"
                    width="150"
                    label="上传人">
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    width="150"
                    label="上传时间">
                    <template scope="scope">
                      {{scope.row.createTime | formatDate}}
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item v-show="showTpl">
                <el-button size="small" type="primary" @click="showTmpl=true">模板信息</el-button>
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
  import {formatDate, formatTimeStamp, formatToDate} from '@/filters/moment'
  import {tplTypeMap} from '@/core/consts'
  import {downloadUrl} from '@/api/consts'

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
        endDate: '9999-12-31',
        showTmpl: false,
        rules: {
          templateCode: [{required: true, message: '请输入模板编号', trigger: 'blur'}],
          abolishDate: [{type: 'date', required: true, message: '请选择停用日期', trigger: 'change'}],
          abolishReason: [{required: true, max: 300, message: '请填写停用原因', trigger: 'change'}]
        },
        download: downloadUrl
      }, _.cloneDeep(defaultData))
    },
    methods: {
      createFilter(result) {
        return result.map((item) => {
          return {value: item}
        })
      },
      querySearch(queryString, cb) {
        if (!queryString) {
          return cb([])
        }
        supportModel.selectTemplateCode({
          templateCode: queryString,
          type: 2
        }).then((res) => {
          const result = res.data.dataMap || []
          cb(this.createFilter(result))
        }, () => {
          cb([])
        })
      },
      search() {
        this.comLoading()
        supportModel.getCurrentTemplateByCode({
          templateCode: this.form.templateCode
        }).then((res) => {
          console.log(res)
          this.comLoading(false)
          this.resetForm()
          const tplInfo = res.data.dataMap
          this.setData(tplInfo)
        }, () => {
          this.comLoading(false)
        })
      },
      setData(tplInfo) {
        const {templateName, templateType, bizTypes, startDate, version, operatorName, creatorName, description, files} = tplInfo
        this.tplInfo = tplInfo
        this.form['templateName'] = templateName
        this.form['templateType'] = tplTypeMap[templateType]
        this.form['busiTypeText'] = bizTypes.map(item => item.businessName).join(',')
        this.form['startDate'] = formatToDate(startDate)
        this.form['version'] = `V${version}`
        this.form['operatorName'] = operatorName
        this.form['creatorName'] = creatorName
        this.form['description'] = description
        this.fileList = files
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
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.comLoading({
              text: '正在提交中'
            })
            const result = this.getResult()
            supportModel.setTemplateAbolish(result).then((res) => {
              console.log(res)
              this.comLoading(false)
              this.$message({
                message: '废除提交成功',
                type: 'success'
              })
              this.back()
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
      Tmpl,
      Upload
    },
    computed: {
      showTpl() {
        return this.tplInfo.templateType === 'TEMPLATE'
      }
    },
    filters: {
      formatDate
    }
  }
</script>
