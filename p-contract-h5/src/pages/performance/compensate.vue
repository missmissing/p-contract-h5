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
          <el-form label-width="120px" :model="basicForm" :rules="basicRules" ref="basicForm">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号" prop="contractNo">
                  <el-input
                    v-model="basicForm.contractNo"
                    @keyup.enter.native="search">
                    <i class="el-icon-search" slot="suffix" @click="search"></i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" class="ml20" v-show="toDetail.query.contractNo">
                <router-link class="router-link-default" :to="toDetail" target="_blank">详 情</router-link>
              </el-button>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同签署日期">
                  <el-input :value="signTime | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同生效日期">
                  <el-input :value="startTime | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同中止日期">
                  <el-input :value="endTime | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务经办人">
                  <el-input :value="businessOperator" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属部门">
                  <el-input :value="businessDept" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="违约方">
              <el-radio class="radio" v-model="defaulter" :label="0">我方</el-radio>
              <el-radio class="radio" v-model="defaulter" :label="1">对方</el-radio>
              <el-radio class="radio" v-model="defaulter" :label="2">双方</el-radio>
            </el-form-item>
            <el-form-item label="涉及赔付">
              <el-switch
                v-model="compensateStatus"
                on-text=""
                off-text="">
              </el-switch>
            </el-form-item>
            <el-row v-show="compensateStatus">
              <el-col :span="8">
                <el-form-item label="赔付类型">
                  <el-select class="wp100" v-model="compensateType" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="赔付金额">
                  <el-input v-model="compensateMoney"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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
            </el-form-item>
            <el-form-item label="违约/赔付原因" prop="violateReason">
              <el-input
                type="textarea"
                :maxlength="300"
                v-model="handleForm.violateReason">
              </el-input>
            </el-form-item>
            <el-form-item label="处理方案" prop="treatmentScheme">
              <el-input
                type="textarea"
                :maxlength="300"
                v-model.trim="handleForm.treatmentScheme">
              </el-input>
            </el-form-item>
            <el-form-item label="相关附件">
              <Upload
                :fileList.sync="fileList"
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
  </div>
</template>

<script>
  import Api from '../../api/performance'
  import Upload from '../../components/upload.vue'
  import {formatDate} from '../../filters/moment'
  import {routerNames} from '../../core/consts'
  import comLoading from '../../mixins/comLoading'

  export default {
    mixins: [comLoading],
    data () {
      return {
        signTime: '',
        startTime: '',
        endTime: '',
        businessOperator: '',
        businessDept: '',
        defaulter: 1,
        compensateStatus: false,
        compensateType: null,
        compensateMoney: '',
        fileList: [],
        options: [{label: '供应商向我方赔付', value: 0}, {label: '我方向供应商赔付', value: 1}],
        info: {},
        toDetail: {name: routerNames.con_Check, query: {contractNo: ''}},
        basicForm: {
          contractNo: ''
        },
        basicRules: {
          contractNo: [{required: true, message: '请输入合同编号', trigger: 'change'}]
        },
        handleForm: {
          schemeType: 1,
          violateReason: '',
          treatmentScheme: '',
          files: null
        },
        handleFormRules: {
          violateReason: [{required: true, message: '请输入违约/赔付原因'}, {
            max: 300,
            message: '长度不超过300个字符'
          }],
          treatmentScheme: [{required: true, message: '请输入处理方案'}, {
            max: 300,
            message: '长度不超过300个字符'
          }]
        }
      }
    },
    methods: {
      search () {
        if (!this.basicForm.contractNo) {
          return
        }
        this.comLoading()
        Api.getContractViolateBaseByContractNo({contractNo: this.basicForm.contractNo}).then((res) => {
          const data = res.data.dataMap
          this.info = data
          const {
            startTime, endTime, businessOperator, businessDept, signTime
          } = data
          this.startTime = startTime
          this.endTime = endTime
          this.signTime = signTime
          this.businessDept = businessDept
          this.businessOperator = businessOperator
          this.toDetail.query.contractNo = this.basicForm.contractNo
          this.comLoading(false)
        }, () => {
          this.comLoading(false)
        })
      },
      getResult () {
        const files = []
        this.fileList.forEach((file) => {
          if (file.status === 'success') {
            files.push(file.fileId)
          }
        })
        this.handleForm.files = files
        return {
          contractNo: this.info.contractNo,
          defaulter: this.defaulter,
          compensateStatus: this.compensateStatus,
          compensateType: this.compensateType,
          compensateMoney: this.compensateMoney,
          ...this.handleForm
        }
      },
      check () {
        let flag = false
        this.$refs.basicForm.validate((valid) => {
          if (valid) {
            this.$refs.handleForm.validate((valid1) => {
              if (valid1) {
                flag = true
              }
            })
          }
        })

        return flag
      },
      submit () {
        const result = this.getResult()
        console.log(result)
        if (!this.check()) {
          this.$message.warning('表单信息不完整！')
          return
        }
        this.comLoading({
          text: '正在提交中'
        })
        Api.contractViolateSave(result).then(() => {
          this.comLoading(false)
          this.$router.push({
            name: routerNames.con_index
          })
        }, () => {
          this.comLoading(false)
        })
      }
    },
    components: {
      Upload
    },
    filters: {
      formatDate
    }
  }
</script>
