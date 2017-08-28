<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div>
    <transition name="component-fade" mode="out-in">
      <div v-if="!showTmpl">
        <el-card>
          <div slot="header">
            <span class="common-title">基本信息</span>
          </div>
          <div>
            <el-form ref="form" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="文本名称">
                    <el-input
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
              <el-row>
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
              <el-form-item label="使用说明">
                <el-input
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
    <transition name="component-fade" mode="in-out">
      <Tmpl v-show="showTmpl" :showTmpl.sync="showTmpl"></Tmpl>
    </transition>
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
  import _ from 'lodash'
  import Tmpl from './tmpl.vue'
  import Upload from '@/components/upload.vue'
  import TreeModal from '@/components/treeModal.vue'
  import supportModel from '@/api/support'
  import getBusiType from '@/mixins/getBusiType'
  import {uploadUrl, downloadUrl} from '@/api/consts'
  import {formatTimeStamp} from '@/filters'

  const defaultData = {
    form: {
      templateName: '',
      templateType: '',
      startDate: '',
      description: '',
      bizTypes: [],
      files: []
    },
    action: uploadUrl,
    download: downloadUrl,
    fileList: [],
    uploadData: {userId: '12'},
    endDate: '9999-12-31',
    busiTypeText: '',
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
    showTmpl: false
  }

  export default {
    mixins: [getBusiType],
    data() {
      return Object.assign({
        regions: []
      }, _.cloneDeep(defaultData))
    },
    methods: {
      showTreeModal() {
        this.visible = true
      },
      formatDate(value) {
        this.form.startDate = formatTimeStamp(value)
      },
      setBusiType(value, tree) {
        let bizTypes = []
        let busiTypeText = []
        const leafs = tree.getCheckedNodes(true)
        leafs.forEach((item) => {
          bizTypes.push(item.id)
          busiTypeText.push(item.businessName)
        })
        this.form.bizTypes = bizTypes
        this.busiTypeText = busiTypeText.join(',')
      },
      getResult() {
        const {info} = this.$store.state.support.create
        const result = {...this.form, ...info}
        const files = _.map(this.fileList, (file) => {
          if (file.status === 'success') {
            return file.fileId
          }
        })
        console.log(files)
        return Object.assign(result, {files}, {
          operatorId: 1,
          operatorName: 'haha',
          departmentId: 12,
          departmentName: 'hehe'
        })
      },
      back() { // 返回列表页
        this.$router.push('/contemplate/list')
      },
      save(templateStatus) {
        const result = this.getResult()
        result.templateStatus = templateStatus
        console.log('click save：', result)
        supportModel.addTpl(result).then((res) => {
          console.log(res)
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (templateStatus === 1) {
            this.back()
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
