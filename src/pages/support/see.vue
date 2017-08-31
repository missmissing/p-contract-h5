<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div
    v-loading="loadingFlag"
    :element-loading-text="loadingText">
    <transition name="component-fade" mode="out-in">
      <div v-show="!showTmpl">
        <el-card class="mb20">
          <div slot="header">
            <span class="common-title">基本信息</span>
          </div>
          <div>
            <el-form
              ref="form"
              label-width="120px">
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
                    {{form.busiTypeText}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="生效时间">
                    {{form.startDate}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="终止时间">
                    {{form.endDate}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="创建人">
                    {{form.creatorName}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最新版本">
                    {{form.version}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最近更新人">
                    {{form.operatorName}}
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
  import supportModel from '@/api/support'
  import comLoading from '@/mixins/comLoading'
  import {uploadUrl, downloadUrl} from '@/api/consts'
  import {formatDate} from '@/filters/moment'

  const defaultData = {
    form: {
      templateCode: '',
      templateName: '',
      templateType: 'TEMPLATE',
      startDate: '',
      endDate: '',
      description: '',
      files: [],
      busiTypeText: '',
      operatorName: '',
      creatorName: '',
      version: ''
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
        showTmpl: false
      }, _.cloneDeep(defaultData))
    },
    methods: {
      setData(tplInfo) {
        const {templateCode, templateName, templateType, bizTypes, startDate, endDate, version, operatorName, creatorName,description, files} = tplInfo
        this.tplInfo = tplInfo
        this.form['templateCode'] = templateCode
        this.form['templateName'] = templateName
        this.form['templateType'] = templateType
        this.form['busiTypeText'] = bizTypes.map(item => item.businessName).join(',')
        this.form['startDate'] = formatDate(startDate)
        this.form['endDate'] = formatDate(endDate)
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
      getTplData() {
        this.comLoading(1)
        supportModel.getTplData({
          templateId: this.$route.params.id
        }).then((res) => {
          console.log(res)
          const tplInfo = res.data.dataMap
          this.setData(tplInfo)
          this.comLoading()
        }, () => {
          this.comLoading()
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
      tplTypeShow() {
        return this.form.templateType === 'TEXT'
      }
    }
  }
</script>
