<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <div class="mb10 clearfix" v-if="procInstId">
      <div class="fl fb">{{procTitle}}</div>
      <div class="fr mr20">流程编号 {{procInstId}}</div>
    </div>
    <transition name="component-fade" mode="out-in">
      <div v-show="!showTmpl">
        <el-card class="mb20">
          <div slot="header">
            <span class="common-title">基本信息</span>
          </div>
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
                <el-form-item label="类型">
                  {{form.templateType === 'TEMPLATE' ? '合同模板' : '合同文本'}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="业务类型">
                  {{form.busiTypeText}}
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="!$route.query.processData">
                <el-form-item label="状态">
                  {{form.templateStatus | tplStatus}}
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
              <el-col :span="8">
                <el-form-item label="版本">
                  <span v-if="$route.query.processData">{{form.version}}</span>
                  <el-select @change="changeVersion" v-model="templateId" style="width:90px;" v-else>
                    <el-option
                      v-for="item in versions"
                      :key="item.id"
                      :label="`V${item.version}`"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建人">
                  {{form.creatorName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最近更新人">
                  {{form.operatorName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="更新时间">
                  {{form.updateTime}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="申请原因">
              {{form.description}}
            </el-form-item>
            <el-form-item label="文本上传" v-if="fileList.length>0">
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
            <div v-if="showAbolish">
              <el-form-item label="废除日期">
                {{form.endDate}}
              </el-form-item>
              <el-form-item label="废除原因">
                {{form.abolishReason}}
              </el-form-item>
            </div>
            <el-form-item v-show="!tplTypeShow">
              <el-button size="small" type="primary" @click="showTmpl=true">模板信息</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <Process></Process>
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
  import Process from '@/components/process.vue'
  import supportModel from '@/api/support'
  import comLoading from '@/mixins/comLoading'
  import {formatDate} from '@/filters/moment'
  import tplStatus from '@/filters/tplStatus'
  import {tplMap} from '@/core/consts'
  import {downloadUrl} from '@/api/consts'

  const defaultData = {
    procTitle: '',
    procInstId: '',
    form: {
      templateCode: '',
      templateName: '',
      templateType: 'TEMPLATE',
      templateStatus: '',
      startDate: '',
      endDate: '',
      description: '',
      abolishReason: '',
      files: [],
      busiTypeText: '',
      operatorName: '',
      creatorName: '',
      version: ''
    },
    versions: [],
    tplInfo: {},
    fileList: []
  }

  export default {
    mixins: [comLoading],
    data() {
      return Object.assign({
        showTmpl: false,
        templateId: this.$route.query.id,
        showAbolish: false,
        download: downloadUrl
      }, _.cloneDeep(defaultData))
    },
    methods: {
      setData(tplInfo) {
        const {templateCode, templateName, templateType, templateStatus, bizTypes, startDate, endDate, updateTime, abolishReason, version, operatorName, creatorName, description, files} = tplInfo
        this.tplInfo = tplInfo
        this.form['templateCode'] = templateCode
        this.form['templateName'] = templateName
        this.form['templateType'] = templateType
        this.form['templateStatus'] = templateStatus
        this.form['busiTypeText'] = bizTypes.map(item => item.businessName).join(',')
        this.form['startDate'] = formatDate(startDate)
        this.form['endDate'] = formatDate(endDate)
        this.form['updateTime'] = formatDate(updateTime)
        this.form['abolishReason'] = abolishReason
        this.form['version'] = `V${version}`
        this.form['operatorName'] = operatorName
        this.form['creatorName'] = creatorName
        this.form['description'] = description
        this.fileList = files || []
      },
      getTplData(id) {
        this.comLoading()
        supportModel.getTplData({
          templateId: id
        }).then((res) => {
          console.log(res)
          const tplInfo = res.data.dataMap
          this.setData(tplInfo)
          this.comLoading(false)
        }).catch(() => {
          this.comLoading(false)
        })
      },
      getAllVersions() {
        const {templateCode} = this.form
        supportModel.getAllTemplateByCode({templateCode}).then((res) => {
          this.versions = res.data.dataMap
        }).catch(() => {
          this.comLoading(false)
        })
      },
      changeVersion(val) {
        this.getTplData(val)
      }
    },
    components: {
      Tmpl,
      Upload,
      Process
    },
    created() {
      const {id, processData} = this.$route.query
      this.getTplData(id)
      if (processData) {
        const {procCode, procInstId, procTitle} = JSON.parse(processData)
        this.showAbolish = procCode === tplMap[2]
        this.procInstId = procInstId
        this.procTitle = procTitle
      }
    },
    filters: {
      formatDate,
      tplStatus
    },
    computed: {
      tplTypeShow() {
        return this.form.templateType === 'TEXT'
      }
    },
    watch: {
      'form.templateCode'() {
        this.getAllVersions()
      },
      versions() {
        const {id} = this.$route.query
        this.templateId = id
      }
    }
  }
</script>
