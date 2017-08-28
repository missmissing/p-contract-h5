<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <div v-if="!showTmpl"
         v-loading="loading"
         element-loading-text="拼命加载中">
      <el-card>
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div>
          <el-form ref="form" label-width="120px">
            <el-row>
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
                    :value="busiTypeText"
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
                disabled
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="form.description">
              </el-input>
            </el-form-item>
            <el-row>
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
          </el-form>
        </div>
      </el-card>
      <el-row class="mt20 mb20 ml20">
        <el-button type="primary" @click="abolishFn">提交</el-button>
      </el-row>
    </div>
    <Tmpl v-show="showTmpl" :tplInfo="tplInfo" :showTmpl.sync="showTmpl"></Tmpl>
  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'
  import Tmpl from './tmpl.vue'
  import Upload from '@/components/upload.vue'
  import supportModel from '@/api/support'
  import {uploadUrl, downloadUrl} from '@/api/consts'
  import {formatDate} from '@/filters'

  const defaultData = {
    form: {
      id: '',
      templateCode: '',
      templateName: '',
      templateType: '',
      startDate: '',
      description: '',
      files: []
    },
    tplInfo: {},
    action: uploadUrl,
    download: downloadUrl,
    fileList: [],
    abolishForm: {
      endDate: '',
      abolishReason: ''
    },
    endDate: '9999-12-31',
    busiTypeText: '',
    operatorName: '',
    creatorName: '',
    version: '',
    showTmpl: false,
    loading: false
  }

  export default {
    data() {
      return Object.assign({
        regions: []
      }, _.cloneDeep(defaultData))
    },
    methods: {
      search() {
        this.loading = true
        supportModel.getCurrentTemplateByCode({
          templateCode: this.form.templateCode
        }).then((res) => {
          console.log(res)
          Object.assign(this.$data, _.cloneDeep(defaultData))
          const tplInfo = res.data.dataMap
          this.setData(tplInfo)
          this.loading = false
        })
      },
      formatDate1(value) {
        this.abolishForm.endDate = value ? moment(value).valueOf() : ''
      },
      setData(tplInfo) {
        this.tplInfo = tplInfo
        this['version'] = `V${tplInfo['version']}`
        this['operatorName'] = tplInfo['operatorName']
        this['creatorName'] = tplInfo['creatorName']
        this['busiTypeText'] = tplInfo['bizTypes'].map(item => item.businessName).join(',')
        tplInfo['files'].forEach((item) => {
          this.fileList.push({
            name: item.fileName,
            url: `${this.download}${item.fileId}`
          })
        })
        Object.keys(this.form).forEach((key) => {
          if (tplInfo.hasOwnProperty(key)) {
            if (key !== 'bizTypes') {
              this.form[key] = tplInfo[key]
            }
          }
        })
      },
      getTplData() {
        if (this.see) {
          supportModel.getTplData({
            templateId: this.$route.params.id
          }).then((res) => {
            console.log(res)
            const tplInfo = res.data.dataMap
            this.setData(tplInfo)
          })
        }
      },
      getResult() {
        const {info} = this.$store.state.support.create
        const result = {...this.form, ...info}
        return Object.assign(result, {
          operatorId: 1,
          operatorName: 'haha',
          departmentId: 12,
          departmentName: 'hehe'
        })
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
        })
      },
      createFilter(result) {
        return result.map((item) => {
          return {value: item, label: item}
        })
      },
      abolishFn() {
        supportModel.setTemplateAbolish({
          templateId: this.form.id,
          endDate: this.abolishForm.endDate,
          abolishReason: this.abolishForm.abolishReason
        }).then((res) => {
          console.log(res)
          this.$message({
            message: '废除提交成功',
            type: 'success'
          })
          this.back()
        })
      }
    },
    components: {
      Tmpl,
      Upload
    },
    created() {
      this.getTplData()
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
