<style type="text/scss" lang="scss" scoped>
  .form-container {

  }
</style>

<template>
  <div class="form-container">
    <div>
      <el-card>
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div class="basic-info">
          <el-form label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="采购订单编号">
                  <el-input v-model="prCode" icon="search" :on-icon-click="search"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="info" class="ml20">详 情</el-button>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="业务经办人">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务部门">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同编号">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同模式">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同版本">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同类型">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属项目">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="验收责任人">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同生效日期">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同终止日期">
                  <el-input disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同验收日期">
                  <el-date-picker
                    style="width:100%;"
                    v-model="checkDate"
                    type="date"
                    :editable="false"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">不合格事项</span>
        </div>
        <div class="nonconformity-info">
          <div class="mb20">
            <el-button type="primary" @click="addItem">新 增</el-button>
          </div>
          <el-table
            :data="nonconformity"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="acceptRequire"
              label="验收要素">
            </el-table-column>
            <el-table-column
              prop="referStandar"
              label="参考标准">
            </el-table-column>
            <el-table-column
              prop="inspectResult"
              label="检查结果">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, serverData)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <span class="common-title">处理结论</span>
        </div>
        <div class="handle-info">
          <el-form label-width="120px">
            <el-form-item label="">
              <el-radio class="radio" v-model="radio" label="1">继续履行</el-radio>
              <el-radio class="radio" v-model="radio" label="2">变更合同</el-radio>
              <el-radio class="radio" v-model="radio" label="3">按验收实际结果履行合同</el-radio>
              <el-radio class="radio" v-model="radio" label="4">转合同违约处理</el-radio>
            </el-form-item>
            <el-form-item label="不合格原因">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="reason">
              </el-input>
            </el-form-item>
            <el-form-item label="处理方案">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="handleResult">
              </el-input>
            </el-form-item>
            <el-form-item label="相关附件">
              <Upload
                :action="action"
                :download="download"
                :fileList.sync="fileList"
                :data="uploadData"
                multiple>
                <!--<div class="el-upload__tip" slot="tip">文件不超过10M</div>-->
              </Upload>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="mt20 mb20 ml20">
      <!--<el-button>保 存</el-button>-->
      <el-button type="primary">提 交</el-button>
    </div>

    <el-dialog
      title="新增不合格事项"
      :visible.sync="addNotQualityDialogVisible">
      <el-form
        ref="addNotQualityDialogForm"
        :model="addNotQualityDialogForm"
        :rules="qualityRules"
        label-width="80px">
        <el-form-item label="验收要求" prop="acceptRequire">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2,maxRows:4 }"
            resize="none"
            v-model="addNotQualityDialogForm.acceptRequire">
          </el-input>
        </el-form-item>
        <el-form-item label="参考标准" prop="referStandar">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2,maxRows:4 }"
            resize="none"
            v-model="addNotQualityDialogForm.referStandar">
          </el-input>
        </el-form-item>
        <el-form-item label="检查结果" prop="inspectResult">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2,maxRows:4 }"
            resize="none"
            v-model="addNotQualityDialogForm.inspectResult">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2,maxRows:4 }"
            resize="none"
            v-model="addNotQualityDialogForm.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addNotQualityDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="addNotQualityDialogOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Api from '@/api/performance'
  import Upload from '@/components/upload.vue'
  import {uploadUrl, downloadUrl} from '@/api/consts'

  export default {
    data() {
      return {
        prCode: '',
        checkDate: '',
        radio: '1',
        reason: '',
        handleResult: '',
        action: uploadUrl,
        download: downloadUrl,
        fileList: [],
        uploadData: {},
        nonconformity: [],
        addNotQualityDialogForm: {
          acceptRequire: '',
          referStandar: '',
          inspectResult: '',
          remark: ''
        },
        addNotQualityDialogVisible: false,
        qualityRules: {
          acceptRequire: [{
            required: true,
            message: '请输入验收要求',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          referStandar: [{
            required: true,
            message: '请输入参考标准',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          inspectResult: [{
            required: true,
            message: '请输入检查结果',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          remark: [{max: 300, message: '长度不超过300个字符', trigger: 'change'}]
        }
      }
    },
    methods: {
      search() {
        console.log(this.prCode)
      },
      addNotQualityDialogOk() {
        this.$refs['addNotQualityDialogForm'].validate((valid) => {
          if (valid) {
            const form = this.addNotQualityDialogForm
            this.nonconformity.push({...form})
            Object.keys(form).forEach((key) => {
              form[key] = ''
            })
            this.addNotQualityDialogVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      addItem() {
        this.addNotQualityDialogVisible = true
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
      }
    },
    components: {
      Upload
    }
  }
</script>
