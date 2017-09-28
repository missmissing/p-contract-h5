<style type="text/scss" lang="scss" scoped>
  .form-container {
    .router-link {
      color: #FFFFFF;
    }
  }
</style>

<template>
  <div class="form-container"
       v-loading="loadingFlag"
       :element-loading-text="loadingText">
    <div>
      <el-card>
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div class="basic-info">
          <el-form label-width="120px" :model="basicForm" :rules="basicRules" ref="basicForm">
            <el-row>
              <el-col :span="8">
                <el-form-item label="采购订单号" prop="orderId">
                  <el-input v-model="basicForm.orderId" icon="search" :on-icon-click="search" @keyup.enter.native="search"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" class="ml20" v-show="toDetail.query.id">
                <router-link class="router-link" :to="toDetail" target="_blank">详 情</router-link>
              </el-button>
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
                    v-model="contractCheckDate"
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
              prop="serviceName"
              label="验收要素">
            </el-table-column>
            <el-table-column
              prop="serviceRequire"
              label="参考标准">
            </el-table-column>
            <el-table-column
              prop="checkResult"
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
          <el-form label-width="120px" :model="handleForm" :rules="handleFormRules" ref="handleForm">
            <el-form-item label="">
              <el-radio class="radio" v-model="handleForm.schemeType" :label="0">继续履行</el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" :label="1">变更合同</el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" :label="2">按验收实际结果履行合同</el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" :label="3">转合同违约处理</el-radio>
            </el-form-item>
            <el-form-item label="不合格原因" prop="unqualifiedReason">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="handleForm.unqualifiedReason">
              </el-input>
            </el-form-item>
            <el-form-item label="处理方案" prop="treatmentScheme">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="handleForm.treatmentScheme">
              </el-input>
            </el-form-item>
            <el-form-item label="相关附件">
              <Upload
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
      <el-button type="primary" @click="submit">提 交</el-button>
    </div>

    <el-dialog
      title="新增不合格事项"
      :visible.sync="addNotQualityDialogVisible">
      <el-form
        ref="addNotQualityDialogForm"
        :model="addNotQualityDialogForm"
        :rules="qualityRules"
        label-width="80px">
        <el-form-item label="验收要求" prop="serviceName">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2,maxRows:4 }"
            resize="none"
            v-model="addNotQualityDialogForm.serviceName">
          </el-input>
        </el-form-item>
        <el-form-item label="参考标准" prop="serviceRequire">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2,maxRows:4 }"
            resize="none"
            v-model="addNotQualityDialogForm.serviceRequire">
          </el-input>
        </el-form-item>
        <el-form-item label="检查结果" prop="checkResult">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2,maxRows:4 }"
            resize="none"
            v-model="addNotQualityDialogForm.checkResult">
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
  import {routerNames} from '@/core/consts'
  import comLoading from '@/mixins/comLoading'

  export default {
    mixins: [comLoading],
    data() {
      return {
        contractCheckDate: '',
        fileList: [],
        uploadData: {},
        nonconformity: [],
        addNotQualityDialogForm: {
          serviceName: '',
          serviceRequire: '',
          checkResult: '',
          remark: ''
        },
        addNotQualityDialogVisible: false,
        qualityRules: {
          serviceName: [{
            required: true,
            message: '请输入验收要求',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          serviceRequire: [{
            required: true,
            message: '请输入参考标准',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          checkResult: [{
            required: true,
            message: '请输入检查结果',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          remark: [{max: 300, message: '长度不超过300个字符', trigger: 'change'}]
        },
        basicForm: {
          orderId: ''
        },
        basicRules: {
          orderId: [{required: true, message: '请输入采购订单号', trigger: 'change'}]
        },
        handleForm: {
          schemeType: 1,
          unqualifiedReason: '',
          treatmentScheme: '',
          fileIds: null
        },
        handleFormRules: {
          unqualifiedReason: [{required: true, message: '请输入违约/赔付原因'}, {
            max: 300,
            message: '长度不超过300个字符'
          }],
          treatmentScheme: [{required: true, message: '请输入处理方案'}, {
            max: 300,
            message: '长度不超过300个字符'
          }]
        },
        toDetail: {name: routerNames.con_Check, query: {id: ''}}
      }
    },
    methods: {
      search() {
        if (!this.basicForm.orderId) {
          this.$message.warning('请输入采购订单号！')
          return
        }
        this.comLoading(1)
        Api.getUnqualifiedByOrderId({orderId: this.basicForm.orderId}).then((res) => {
          const data = res.data.dataMap
          console.log(data)
          const {contractId} = data
          this.toDetail.query.id = contractId
          this.comLoading()
        }, () => {
          this.comLoading()
        })
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
      },
      getResult() {
        this.handleForm.fileIds = this.fileList.map((file) => {
          if (file.status === 'success') {
            return file.fileId
          }
        })
      },
      check(result) {
        let flag = false
        this.$refs['basicForm'].validate((valid) => {
          if (valid) {
            this.$refs['handleForm'].validate((valid) => {
              if (valid) {
                flag = true
              }
            })
          }
        })

        return flag
      },
      submit() {
        this.comLoading(1)
        const result = this.getResult()
        if (!this.check(result)) {
          this.$message.warning('表单信息不完整！')
          return
        }
        Api.unqualifiedSave(result).then((res) => {
          this.comLoading()
        })
      }
    },
    components: {
      Upload
    }
  }
</script>
