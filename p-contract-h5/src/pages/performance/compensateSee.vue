<style type="text/scss" lang="scss" scoped>
  .form-container {

  }
</style>

<template>
  <div class="form-container">
    <div>
      <div class="mb10 clearfix" v-if="procInstId">
        <div class="fl fb">{{procTitle}}</div>
        <div class="fr mr20">流程编号 {{procInstId}}</div>
      </div>
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
              <el-radio class="radio" v-model="defaulter" label="US" disabled>我方</el-radio>
              <el-radio class="radio" v-model="defaulter" label="PARTNER" disabled>对方</el-radio>
              <el-radio class="radio" v-model="defaulter" label="BOTH" disabled>双方</el-radio>
            </el-form-item>
            <el-form-item label="涉及赔付">
              <el-switch
                disabled
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
              <el-radio class="radio" v-model="handleForm.schemeType" label="CONTINUE_TO_PERFORM" disabled>继续履行
              </el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" label="UPDATED_CONTRACT" disabled>变更合同</el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" label="PERFORM_WITH_CHECK_RESULT" disabled>
                按验收实际结果履行合同
              </el-radio>
              <el-radio class="radio" v-model="handleForm.schemeType" label="BREACH" disabled>转合同违约处理</el-radio>
            </el-form-item>
            <el-form-item label="违约/赔付原因" prop="violateReason">
              <el-input
                type="textarea"
                :maxlength="300"
                v-model="handleForm.violateReason"
                disabled>
              </el-input>
            </el-form-item>
            <el-form-item label="处理方案" prop="treatmentScheme">
              <el-input
                type="textarea"
                :maxlength="300"
                v-model.trim="handleForm.treatmentScheme"
                disabled>
              </el-input>
            </el-form-item>
            <el-form-item label="相关附件">
              <el-table
                :data="fileList"
                border
                highlight-current-row
                class="wp100">
                <el-table-column
                  prop="fileName"
                  label="文件名">
                  <template slot-scope="scope">
                    <a class="router-link" :href="`${download}${scope.row.fileId}`" target="_blank">{{scope.row.fileName}}</a>
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
                  <template slot-scope="scope">
                    {{scope.row.createTime | formatDate}}
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <Process></Process>
    </div>
  </div>
</template>

<script>
  import Api from '../../api/performance'
  import Upload from '../../components/upload.vue'
  import {formatDate} from '../../filters/moment'
  import {routerNames} from '../../core/consts'
  import comLoading from '../../mixins/comLoading'
  import Process from '../../components/process.vue'
  import {downloadUrl} from '../../api/consts'

  export default {
    mixins: [comLoading],
    data () {
      return {
        procTitle: '',
        procInstId: '',
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
        options: [{label: '供应商向我方赔付', value: 'PARTNER_GIVE_US'}, {label: '我方向供应商赔付', value: 'US_GIVE_PARTNER'}],
        toDetail: {name: routerNames.con_Check, query: {contractId: ''}},
        basicForm: {
          contractNo: ''
        },
        handleForm: {
          schemeType: null,
          violateReason: '',
          treatmentScheme: ''
        },
        download: downloadUrl
      }
    },
    methods: {
      getInfo (id) {
        this.comLoading()
        Api.getViolateByProcInstId({procInstId: id}).then((res) => {
          this.comLoading(false)
          const data = res.data.dataMap
          console.log(data)
          this.setData(data)
        }, () => {
          this.comLoading(false)
        })
      },
      setData (data) {
        const {contractBasic, violateDispose} = data
        const {
          startTime, endTime, businessOperator, businessDept, signTime, contractNo
        } = contractBasic
        const {
          files, schemeType, defaulter, compensateType, compensateStatus, compensateMoney, treatmentScheme, violateReason
        } = violateDispose
        this.basicForm.contractNo = contractNo
        this.fileList = files || []
        this.startTime = startTime
        this.endTime = endTime
        this.signTime = signTime
        this.businessDept = businessDept
        this.businessOperator = businessOperator
        this.defaulter = defaulter
        this.compensateType = compensateType
        this.compensateStatus = compensateStatus
        this.compensateMoney = compensateMoney
        Object.assign(this.handleForm, {
          schemeType,
          violateReason,
          treatmentScheme
        })
        this.toDetail.query.contractNo = contractNo
      }
    },
    created () {
      const {id, processData} = this.$route.query
      this.getInfo(id)
      if (processData) {
        const data = JSON.parse(processData)
        const {procTitle, procInstId} = data
        this.procInstId = procInstId
        this.procTitle = procTitle
      }
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
