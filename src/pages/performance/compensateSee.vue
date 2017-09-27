<style type="text/scss" lang="scss" scoped>
  .form-container {
    .router-link {
      color: #FFFFFF;
    }
  }
</style>

<template>
  <div
    class="form-container"
    v-loading="loadingFlag"
    :element-loading-text="loadingText">
    <div>
      <el-card>
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div class="basic-info">
          <el-form label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input :value="basicForm.contractNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" class="ml20" v-show="toDetail.query.contractId">
                <router-link class="router-link" :to="toDetail" target="_blank">详 情</router-link>
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
              <el-radio class="radio" v-model="defaulter" :label="0" disabled>我方</el-radio>
              <el-radio class="radio" v-model="defaulter" :label="1" disabled>对方</el-radio>
              <el-radio class="radio" v-model="defaulter" :label="2" disabled>双方</el-radio>
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
                  <el-select class="wp100" v-model="compensateType" placeholder="请选择" disabled>
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
                  <el-input v-model="compensateMoney" disabled></el-input>
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
          <el-form label-width="120px">
            <el-form-item label="">
              <el-radio class="radio" v-model="handleForm.schemeType" :label="0" disabled>继续履行</el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" :label="1" disabled>变更合同</el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" :label="2" disabled>按验收实际结果履行合同</el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" :label="3" disabled>转合同违约处理</el-radio>
            </el-form-item>
            <el-form-item label="违约/赔付原因" prop="violateReason">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="handleForm.violateReason"
                disabled>
              </el-input>
            </el-form-item>
            <el-form-item label="处理方案" prop="treatmentScheme">
              <el-input
                type="textarea"
                :maxlength="300"
                :autosize="{ minRows: 2 }"
                resize="none"
                v-model="handleForm.treatmentScheme"
                disabled>
              </el-input>
            </el-form-item>
            <el-form-item label="相关附件">
              <Upload
                :fileList.sync="fileList"
                :data="uploadData"
                disabled
                multiple>
                <!--<div class="el-upload__tip" slot="tip">文件不超过10M</div>-->
              </Upload>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <Process></Process>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/performance'
  import Upload from '@/components/upload.vue'
  import {formatDate} from '@/filters/moment'
  import {routerNames} from '@/core/consts'
  import comLoading from '@/mixins/comLoading'
  import Process from '@/components/process'

  export default {
    mixins: [comLoading],
    data() {
      return {
        signTime: '',
        startTime: '',
        endTime: '',
        businessOperator: '',
        businessDept: '',
        defaulter: null,
        compensateStatus: false,
        compensateType: null,
        compensateMoney: '',
        fileList: [],
        uploadData: {},
        options: [{label: '供应商向我方赔付', value: 0}, {label: '我方向供应商赔付', value: 1}],
        info: {},
        toDetail: {name: routerNames.con_Check, query: {contractId: ''}},
        basicForm: {
          contractNo: ''
        },
        handleForm: {
          schemeType: null,
          violateReason: '',
          treatmentScheme: '',
          fileIds: null
        }
      }
    },
    methods: {
      getInfo(id) {
        this.comLoading(1)
        Api.getViolateByProcInstId({procInstId: id}).then((res) => {
          const data = res.data.dataMap
          console.log(data)
          this.info = data
          const {startTime, endTime, businessOperator, businessDept, signTime, contractId} = data
          this.startTime = startTime
          this.endTime = endTime
          this.signTime = signTime
          this.businessDept = businessDept
          this.businessOperator = businessOperator
          this.toDetail.query.contractId = contractId
          this.comLoading()
        }, () => {
          this.comLoading()
        })
      }
    },
    created() {
      const {id} = this.$route.query
      this.getInfo(id)
    },
    components: {
      Upload,
      Process
    },
    filters: {
      formatDate
    }
  }
</script>
